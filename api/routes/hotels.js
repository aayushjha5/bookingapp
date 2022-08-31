import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create a hotel
router.post("/", verifyAdmin, createHotel);

//update specific Hotel
router.put("/:id", verifyAdmin, updateHotel);

//delete specific Hotel
router.delete("/:id", verifyAdmin, deleteHotel);

//get specific Hotel
router.get("/find/:id", getHotel );

//get all hotels
router.get("/", getHotels);

//get countByCity
router.get("/countByCity", countByCity );

//get countByType
router.get("/countByType", countByType );

//for rooms
router.get("/room/:id", getHotelRooms );


export default router;
