let mongoose = require("mongoose");
let bookingSchema = new mongoose.Schema({
    taskproviderinfo:{
        type:Object,
        required:true
    },
    userInfo:{
        type:Object,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
});

let bookingModel = mongoose.model("booking",bookingSchema);
module.exports = {bookingModel};