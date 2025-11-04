let mongoose = require("mongoose");

let connectDB =async()=>{
try{
    await mongoose.connect();
}
catch(error){
    console.log(error.message);
}
}