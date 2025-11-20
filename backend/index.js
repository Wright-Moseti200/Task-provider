let express = require("express");
let cors = require("cors");
let ratelimit = require("express-rate-limit");
const { connectDB } = require("./config/database");
const { userRouter } = require("./routes/userRoute");
const { providerRouter } = require("./routes/providerRoute");
const { webhook } = require("./controllers/userController");
require("dotenv").config();
let app = express();
app.use(cors());

let limit = ratelimit({
    windowMs:10*60*1000,
    max:100
});
app.use(limit);
app.set("trust proxy",1);

app.post("/webhook",express.raw({type:"application/json"}),webhook);

app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/provider",providerRouter);

app.get("/",(req,res)=>{
    res.send("Express server is running");
});

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
