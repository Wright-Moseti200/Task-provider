let cloudinary = require("cloudinary").v2
let {CloudinaryStorage} = require("multer-storage-cloudinary");
let multer = require("multer");
cloudinary.config({
    cloud_name:"",
    api_key:"",
    api_secret:""
});

let storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder_name:"Taskprovider images",
        allowed_formats:["png","jpeg","jpg"]
    }
});

let upload = multer({storage:storage});
module.exports={upload};