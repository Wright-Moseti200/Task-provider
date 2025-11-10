let mongoose = require("mongoose");
require("dotenv").config();
let connectDB =async(req,res)=>{
try{
    await mongoose.connect(`${process.env.MONGO_URL}/taskprovider`);
    console.log("Database is connected successfully");
}
catch(error){
    res.status(500).json({
        success:true,
        message:error.message
    });
}
}

module.exports = {connectDB};