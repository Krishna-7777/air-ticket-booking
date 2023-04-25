const jwt=require("jsonwebtoken")
require("dotenv").config()

const authenticate=async(ask,give,next)=>{
    let token=ask.headers.authorization;
    try {
        let decode=jwt.verify(token,process.env.secret)
    next()
    } catch (error) {
        give.send({msg:"Not Authorised!"})
    }
    
}

module.exports={authenticate}