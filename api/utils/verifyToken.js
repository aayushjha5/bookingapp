import  jwt  from "jsonwebtoken";
import { createError } from "./error.js";

//verify authentication
export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;

    //if there is no token it means we are not authentication
    if(!token){
        return next(createError(401,"You are not authenticated!"));
    }

    //is token is there verify it
    jwt.verify(token, process.env.JWT, (err, user)=>{
        //if not valid then
        if(err) return next(createError(403,"Invalid Token!"));
        //if valid then 
        req.user = user;
        next();
    });
};

//verify specific user to perform crud operations for specific user
export const  verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
             return next(createError(403,"You are not authorized"));
        }
    })
};

//verify whether admin or not
export const  verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        } else {
             return next(createError(403,"You are not authorized"));
        }
    })
};
