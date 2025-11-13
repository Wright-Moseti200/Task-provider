let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const { userModel } = require("../models/userModel");
const { providerModel } = require("../models/ProviderModel");
const { ratingModel } = require("../models/ratingModel");
const { bookingModel } = require("../models/BookingModel");
require("dotenv").config();

//Signup
let signup = async(req,res)=>{
    try{
        let {email,username,password,phone_number} = req.body;
        if(!username||!email||!password||!phone_number){
            return res.status(400).json({
                success:false,
                message:"Fill in the required details"
            });
        }
        let emailcomp = await userModel.findOne({email:email});
        if(emailcomp){
            return res.status(400).json({
                success:true,
                message:"User already exists"
            });
        }
        let password1 = await bcrypt.hash(password,Number(process.env.BCRYPT_PAS));
        let user = new userModel({
            username:username,
            email:email,
            phone_number:phone_number,
            password:password1
        });
        let userdata = user.save();
        let data = {
            user:{
                id:userdata._id
            }
        }
        let token = jwt.sign(data,process.env.JWT_PAS);
        return res.status(201).json({
            success:true,
            token:token
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//Login
let login = async(req,res)=>{
    try{
         let {email,password} = req.body;
         if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Enter the required details"
            });
         }
         let emailcomp = await userModel.findOne({email:email});
         if(!emailcomp){
            return res.status(404).json({
                success:false,
                message:"Email doesnt exist"
            });
         }
         let passcomp = await bcrypt.compare(emailcomp.password,password);
         if(!passcomp){
            return res.status(404).json({
                success:true,
                message:"Password is incorrect"
            });
         }
         let data = {
            user:{
                id:emailcomp._id
            }
         }
         let token = jwt.sign(data,process.env.JWT_PAS);
         return res.status(200).json({
            success:true,
            token:token
         });
    }
    catch(error){
     res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//booking
let booking = async(req,res)=>{
    try{
        let {taskname,taskcategory,taskphone,tasklocation,service,date,time} = req.body;
        if(!taskname||!taskcategory||!taskphone||!tasklocation||!service||!date||!time){
            return res.status(404).json({
                success:false,
                message:"Fill in the required fields"
            });
        }
        let user = await userModel.findOne({_id:req.user.id});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        let  booking = new bookingModel({
            userInfo:{
                username:user.username,
                phone_number:user.phone_number
            },
            taskproviderinfo:{
                taskname:taskname,
                taskcategory:taskcategory,
                taskphone:taskphone,
                tasklocation:tasklocation
            },
            service:service,
            date:date,
            time:time
        });
        await booking.save();
        res.redirect("/booking");
        return res.status(200).json({
            success:true,
            message:"Booking made"
        });
    }
     catch(error){
     res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//rating
let rating = async(req,res)=>{
try{
    let {taskname,ratingss,comment}=req.body;
    if(!taskname){
        return res.status(404).json({
            success:false,
            message:"Taskprovider not found"
        });
    }
    let user = await userModel.findOne({_id:req.user.id});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        let ratings = new ratingModel({
            serviceProvider:taskname,
            user:user.username,
            rating:ratingss,
            comment:comment
        });
        await ratings.save();
        return res.status(200).json({
            success:true,
            message:"ratings sent"
        });
}
 catch(error){
     res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//updating status
let status = async(req,res)=>{
try{
    let {status,id} = req.body;
    if(!status){
        return res.status(404).json({
            success:false,
            message:"Status is empty"
        });
    }
    await bookingModel.findOneAndUpdate({_id:id},{status:status});
    return res.status(200).json({
        success:true,
        message:"Status updated successfully"
    });
}
 catch(error){
     res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//payment
let payment = (req,res)=>{
    try{
    }
     catch(error){
     res.status(500).json({
            success:true,
            message:error.message
        });
    }
}

//getbookings
let getbookings = async(req,res)=>{
    try{
        let {id} = req.user;
        let user = await userModel.findOne({_id:id});
        if(!user){
            return res.status().json({
                success:false,
                message:"log in / Signup"
            });
        }
        let bookings = await bookingModel.find({"userInfo.username":user.username});
        return res.status(200).json({
            success:true,
            bookings:bookings     
        });
    }
     catch(error){
     res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//getratings
let getratings = async(req,res)=>{
try{
    let {serviceprovider} = req.query;
    let serviceProviderRatings = await ratingModel.find({serviceProvider:serviceprovider});
    if(!serviceProviderRatings){
        return res.status(404).json({
            success:false,
            message:"This service provider has no ratings"
        });
    }
    return res.status(200).json({
        success:true,
        ratings:serviceProviderRatings
    });
}
 catch(error){
     res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//gettaskproviders
let gettaskproviders = async (req,res)=> {
try{
   let taskproviders = await providerModel.find({});
   if(!taskproviders){
    return res.status(404).json({
        success:false,
        message:"No taskproviders in the database"
    });
   } 
   return res.status(200).json({
    success:true,
    taskproviders:taskproviders
   });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}
module.exports={signup,login,getratings,gettaskproviders,getbookings,status,booking,rating};