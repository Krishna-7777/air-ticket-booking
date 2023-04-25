const express=require("express");
const jwt=require("jsonwebtoken");
const { BookingModel } = require("../model/booking.model");
const { FlightModel } = require("../model/flight.model");
const { UserModel } = require("../model/user.model");
require("dotenv").config()

const bookingRoutes=express.Router();

bookingRoutes.post('/booking',async(ask,give)=>{
    let flight=ask.body.flight;
    let user=(jwt.verify(ask.headers.authorization,process.env.secret)).id
    try {
        let bookings= await BookingModel.find({flight});
    if(!bookings.length){
        let flightExists=await FlightModel.findById(flight);
        if(flightExists){
            let seats=flightExists.seats
            if(seats>=1){
                seats--;
                await FlightModel.findByIdAndUpdate(flight,{seats});
                let booking= new BookingModel({user,flight});
                booking.save()
                give.status(201).send({msg:"Flight booked"})
            }else{
                give.status(211).send({msg:"This Flight is currently unavialble!"})
            }
            
        }else{
             give.status(404).send({msg:"This Flight doesn't exist."})
        }
    }else{
        give.status(210).send({msg:"This Flight has already been booked by you."})
    }
    } catch (error) {
        console.log(error)
        give.status(421).send({msg:"Error in booking!"})
    }    
})

bookingRoutes.get("/dashboard",async(ask,give)=>{
    try {
        let bookings=await BookingModel.find();
        let dashboard=[]
        for(let booking of bookings){
            let user=await UserModel.findById(booking.user,{name:1,email:1,_id:0})
            booking.user=user
            booking.flight=await FlightModel.findById(booking.flight,{_id:0})
            dashboard.push(booking)
        }
        give.status(200).send({"dashboard":dashboard})
    } catch (error) {
       give.status(422).send({msg:"Error in loadding the dashboard"}) 
    }
})

module.exports={bookingRoutes}