let mongoose = require("mongoose");
let providerSchema = new mongoose.Schema({
    profile_pic:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    username:{
      type:String,
        required:true   
    },
    email:{
         type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    password:{
         type:String,
        required:true
    },
    about:{
         type:String,
        required:true
    },
    services:{
        type:Array,
        required:true
    }
});

let providerModel = mongoose.model("taskprovider",providerSchema);
module.exports={providerModel};