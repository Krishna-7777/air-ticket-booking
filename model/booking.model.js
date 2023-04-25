const mongoose=require("mongoose");

const schema=mongoose.Schema({
    user : String,
    flight : String
}
)

const BookingModel=mongoose.model("bookings",schema)

module.exports={BookingModel}