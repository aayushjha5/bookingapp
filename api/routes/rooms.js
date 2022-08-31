import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//create a Room
router.post("/:hotelid", verifyAdmin, createRoom);

//update specific Room
router.put("/:id", verifyAdmin, updateRoom);

//update room availability
router.put("/availability/:id",  updateRoomAvailability);


//delete specific Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get specific Room
router.get("/:id", getRoom );

//get all Rooms
router.get("/", getRooms );


export default router;
