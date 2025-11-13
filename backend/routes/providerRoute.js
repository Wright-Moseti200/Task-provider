let express = require("express");
let providerRouter = express.Router();
let {authmiddleware} = require("../middleware/authmiddleware");
let {upload} = require("../middleware/uploadmiddleware");
let {uploadImage, providerSignup, providerLogin, getProviderBookings, getProviderRatings, status} = require("../controllers/providerController");

// Public routes (no authentication required)
providerRouter.post("/upload-image", upload.single('image'), uploadImage);
providerRouter.post("/signup", providerSignup);
providerRouter.post("/login", providerLogin);

// Protected routes (authentication required)
providerRouter.get("/bookings", authmiddleware, getProviderBookings);
providerRouter.get("/ratings", authmiddleware, getProviderRatings);
providerRouter.put("/status", authmiddleware, status);

module.exports = { providerRouter };