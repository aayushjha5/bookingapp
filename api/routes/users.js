import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("Hello User, You are logged in!");
// });

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Hello User, You are logged in! and u can delete");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("Hello Admin, Do your magic!");
// });

//update specific User
router.put("/:id", verifyUser, updateUser);

//delete specific User
router.delete("/:id", verifyUser, deleteUser);

//get specific User
router.get("/:id", verifyUser, getUser);

//get all Users
router.get("/", verifyAdmin, getUsers);


export default router;
