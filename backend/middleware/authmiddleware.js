let jwt = require("jsonwebtoken");
require("dotenv").config();
let authmiddleware = (req,res,next)=>{
    let token = req.header("auth-token");
    if(!token){
        res.status(404).json({
            success:true,
            message:"Token not found"
        });
    }
    let data = jwt.verify(token,process.env.JWT_PAS)
    req.user = data.user;
    next();
}

module.exports={authmiddleware};