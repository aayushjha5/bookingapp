import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js"

//create a room
export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        //save the room
        const savedRoom = await  newRoom.save();

        //updating the hotel i.e add room to that hotel
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id}});
        } catch (err) {
            next(err);
        }
        //send response
        res.status(200).json(savedRoom);
        } catch (err) {
        next(err);
    }
}

//update a room
export const updateRoom = async (req,res,next)=>{
    try {
        const updatedRoom = 
        await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true}) ;
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
} 

//delete a room
export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(
            req.params.id) ;
        //updating the hotel i.e delete room from that hotel
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id}});
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
} 

//get a room
export const getRoom = async (req,res,next)=>{
    try {
        const room = 
        await Room.findById(
            req.params.id) ;
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
} 

//get rooms
export const getRooms = async (req,res,next)=>{
    // const failed = true;
    // if (failed) return next(createError(401,"You are not authenticated!"));

    try {
        const rooms = 
        await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
} 

//update a room availability
export const updateRoomAvailability = async (req,res,next)=>{
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
             $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            },
        });
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
} ;