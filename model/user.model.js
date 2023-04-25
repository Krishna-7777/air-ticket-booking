const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name: String,
    email: String,
    password: String
  })

const UserModel=mongoose.model("user",schema)

module.exports={UserModel}