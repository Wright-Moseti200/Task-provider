let mongoose = require("mongoose");
let ratingSchema = new mongoose.Schema({
    user:{
        required:true,
        type:String
    },
    serviceProvider:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:new Date()
    }
});

let ratingModel = mongoose.model("Rating",ratingSchema);
module.exports = {ratingModel}