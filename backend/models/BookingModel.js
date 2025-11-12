let mongoose = require("mongoose");
let bookingSchema = new mongoose.Schema({
    taskproviderinfo:{
        type:Array,
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
        default:"pending"
    }
});

let bookingModel = mongoose.model("booking",bookingSchema);
module.exports = {bookingModel};