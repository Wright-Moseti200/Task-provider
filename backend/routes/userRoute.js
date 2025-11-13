let express = require("express");
let userRouter = express.Router();
let {authmiddleware} = require("../middleware/authmiddleware");
let {signup,login,getratings,gettaskproviders,getbookings,status,booking,rating} = require("../controllers/userController");

// Public routes (no authentication required)
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/taskproviders", gettaskproviders);
userRouter.get("/ratings", getratings);

// Protected routes (authentication required)
userRouter.post("/booking", authmiddleware, booking);
userRouter.post("/rating", authmiddleware, rating);
userRouter.patch("/status", authmiddleware, status);
userRouter.get("/bookings", authmiddleware, getbookings);

module.exports = { userRouter };