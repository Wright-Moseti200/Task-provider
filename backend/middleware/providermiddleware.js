let jwt = require("jsonwebtoken");
require("dotenv").config();

let providerMiddleware = async(req,res,next)=>{
try{
    let token = req.header("Authorization");
    if(!token){
        return res.status(404).json({
            success:false,
            message:"Nothing not found"
        });
    }
    let data = jwt.verify(token,process.env.JWT_PAS);
    req.user = data.user;
    next();
}
catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}

module.exports={providerMiddleware}