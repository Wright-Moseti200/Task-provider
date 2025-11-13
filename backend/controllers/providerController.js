let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const { providerModel } = require("../models/ProviderModel");
require("dotenv").config();

//Image Upload Function
let uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        return res.status(200).json({
            success: true,
            image_url: req.file.path,
            message: "Image uploaded successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Provider Signup (uses image_url from req.body)
let providerSignup = async (req, res) => {
    try {
        let { category, username, email, phone_number, password, about, services, image_url } = req.body;
        
        if (!category || !username || !email || !phone_number || !password || !about || !services || !image_url) {
            return res.status(400).json({
                success: false,
                message: "Fill in all the required details including image URL"
            });
        }

        let emailcomp = await providerModel.findOne({ email: email });
        if (emailcomp) {
            return res.status(400).json({
                success: false,
                message: "Provider already exists with this email"
            });
        }
        let usernamecomp = await providerModel.findOne({ username: username });
        if (usernamecomp) {
            return res.status(400).json({
                success: false,
                message: "Username already taken"
            });
        }

        let hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_PAS));

        let provider = new providerModel({
            profile_pic: image_url, 
            category: category,
            username: username,
            email: email,
            phone_number: phone_number,
            password: hashedPassword,
            about: about,
            services: servicesArray
        });

        let providerData = await provider.save();
        
        let data = {
            provider: {
                id: providerData._id
            }
        }
        let token = jwt.sign(data, process.env.JWT_PAS);
        
        return res.status(201).json({
            success: true,
            token: token,
            message: "Provider account created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Provider Login 
let providerLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Enter email and password"
            });
        }

        let provider = await providerModel.findOne({ email: email });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider not found"
            });
        }

        let passcomp = await bcrypt.compare(password, provider.password);
        if (!passcomp) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        let data = {
            provider: {
                id: provider._id
            }
        }
        let token = jwt.sign(data, process.env.JWT_PAS);
        
        return res.status(200).json({
            success: true,
            token: token,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get Provider's Bookings
let getProviderBookings = async (req, res) => {
    try {
        let { id } = req.user;
        let provider = await providerModel.findOne({ _id: id });
        
        if (!provider) {
            return res.status(401).json({
                success: false,
                message: "Provider not found"
            });
        }

        let bookings = await bookingModel.find({ 
            "taskproviderinfo.taskname": provider.username 
        });

        return res.status(200).json({
            success: true,
            bookings: bookings     
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get Provider's Ratings
let getProviderRatings = async (req, res) => {
    try {
        let { id } = req.user; 
        let provider = await providerModel.findOne({ _id: id });
        
        if (!provider) {
            return res.status(401).json({
                success: false,
                message: "Provider not found"
            });
        }

        let providerRatings = await ratingModel.find({ 
            serviceProvider: provider.username 
        });

        if (!providerRatings || providerRatings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No ratings found for your profile"
            });
        }

        return res.status(200).json({
            success: true,
            ratings: providerRatings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
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

module.exports = {uploadImage,providerSignup,providerLogin,getProviderBookings,getProviderRatings,status}