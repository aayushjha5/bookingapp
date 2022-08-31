import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        //get username from input
        const user = await User.findOne({
            username: req.body.username
        });

        //check if user exists or not
        if (!user) return next(createError(404, "User not found!"));

        // verify password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        //checking whether pswd is correct or not.
        if (!isPasswordCorrect) return next(createError(400, "wrong password!"));

        //if password is correct , new token is created.
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT
        );

        //destructuring password and isAdmin as they dont have to be send
        const { password, isAdmin, ...otherDetails } = user._doc;

        //response with cookie(containing jwt)
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({details: {...otherDetails}, isAdmin });
    } catch (err) {
        next(err);
    }
}