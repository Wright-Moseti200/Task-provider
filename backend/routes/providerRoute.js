let express = require("express");
let providerRouter = express.Router();
let {authmiddleware} = require("../middleware/authmiddleware");
let {upload} = require("../middleware/uploadmiddleware");
let {uploadImage, providerSignup, providerLogin, getProviderBookings, getProviderRatings, status} = require("../controllers/providerController");
const { providerMiddleware } = require("../middleware/providermiddleware");

// Public routes (no authentication required)
providerRouter.post("/upload-image", upload.single('image'), uploadImage);
providerRouter.post("/signup", providerSignup);
providerRouter.post("/login", providerLogin);

// Protected routes (authentication required)
providerRouter.get("/bookings", providerMiddleware, getProviderBookings);
providerRouter.get("/ratings", providerMiddleware, getProviderRatings);
providerRouter.put("/status", providerMiddleware, status);

module.exports = { providerRouter };