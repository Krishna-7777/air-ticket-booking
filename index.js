const express=require("express");
const cors=require("cors");
const { connect } = require("./config/db");
const { userRoutes } = require("./routes/user.routes");
const { authenticate } = require("./middleware/autenticate.middleware");
const { flightRoutes } = require("./routes/flight.route");
const { bookingRoutes } = require("./routes/booking.route");

const app=express();

app.use(express.json())
app.use(cors());

app.get('/',(ask,give)=>{
    give.send("Air Ticket Booking - Backend")
})

app.use('/api',userRoutes)

app.use(authenticate)

app.use('/api',flightRoutes)

app.use('/api',bookingRoutes)

app.listen("4000",()=>{
    try {
        connect
        console.log("Connected to the DB & Server is running at 4000...")
    } catch (error) {
        console.log("Error in connecting to the DB.")
    }})