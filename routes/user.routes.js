const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
require("dotenv").config()
const { UserModel } = require("../model/user.model");

const userRoutes=express.Router();

userRoutes.post('/register',async(ask,give)=>{
    let {name,email,password}=ask.body;
    let hash=await bcrypt.hash(password,2);
    let user = new UserModel({name,email,"password":hash});
    try {
        await user.save();
    give.status(201).send({msg:"User Registered"})
    } catch (error) {
    give.status(401).send({msg:"Error in Registering the user"})
    }
})

userRoutes.post('/login',async(ask,give)=>{
    let {email,password}=ask.body;
    try {
    let user =await UserModel.find({email});
        if(user.length){
            user=user[0]
            let hash=user.password
            const result=await bcrypt.compare(password,hash);
            if(result){
                let token=jwt.sign({id:user._id},process.env.secret)
                give.status(201).send({msg:"Login SuccessFull",token})
            }else{
                give.status(205).send({msg:"Wrong Credentials!"})
            }
        }else{
            give.status(206).send({msg:"Please Register first."})
        }
    } catch (error) {
    give.status(402).send({msg:"Error in logging in the user!"})
    }
})

module.exports={userRoutes}