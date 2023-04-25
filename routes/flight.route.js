const express=require("express");
const { FlightModel } = require("../model/flight.model");

const flightRoutes=express.Router();

flightRoutes.post('/flights',async(ask,give)=>{
    try {
    let flight=new FlightModel(ask.body)
        flight.save()
        give.status(201).send({msg:"Flight Added!"})
    } catch (error) {
        give.status(411).send({msg:"Error in Adding the Flight!"})
    }
})

flightRoutes.get('/flights',async(ask,give)=>{
    try {
    let flights=await FlightModel.find();
        give.status(200).send({flights})
    } catch (error) {
        give.status(412).send({msg:"Error in showing Flights!"})
    }
})

flightRoutes.get('/flights/:id',async(ask,give)=>{
    try {
    let flights=await FlightModel.find({_id:ask.params.id});
        give.status(200).send({flights})
    } catch (error) {
        give.status(413).send({msg:"Error in showing Flights!"})
    }
})


flightRoutes.delete('/flights/:id',async(ask,give)=>{
    try {
    await FlightModel.findByIdAndDelete({_id:ask.params.id});
        give.status(202).send({msg:"Flight Details Deleted!"})
    } catch (error) {
        give.status(414).send({msg:"Error in Deleting the Flight!"})
    }
})

flightRoutes.patch('/flights/:id',async(ask,give)=>{
    try {
    await FlightModel.findByIdAndUpdate(ask.params.id,ask.body);
        give.status(204).send({msg:"Flight Details Updated!"})
    } catch (error) {
        give.status(415).send({msg:"Error in Updating the Flight Details!"})
    }
})

flightRoutes.put('/flights/:id',async(ask,give)=>{
    try {
    await FlightModel.findByIdAndUpdate(ask.params.id,ask.body);
        give.status(204).send({msg:"Flight Details Updated!"})
    } catch (error) {
        give.status(416).send({msg:"Error in Updating the Flight Details!"})
    }
})
module.exports={flightRoutes}