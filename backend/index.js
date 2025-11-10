let express = require("express");
let cors = require("cors");
let ratelimit = require("express-rate-limit");
const { connectDB } = require("./config/database");
require("dotenv").config();
let app = express();

app.use(cors());
let limit = ratelimit({
    windowMs:10*60*1000,
    max:100
});

app.use(limit);
app.set("trust proxy",1);

connectDB();

app.get("/",(req,res)=>{
    res.send("Express server is running");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
