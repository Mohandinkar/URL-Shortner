const express = require("express");
const app = express();
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userROute = require("./routes/user");
const connectDB = require("./connect");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/auth");

const {handleGetOriginalURL} = require("./controllers/url")

connectDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb Connected"))
.catch((err)=>console.log("Not connected",err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use("/url", authMiddleware.restrictToLoggedinUserOnly,  urlRoute);
app.use("/user",userROute);
app.use("/",authMiddleware.checkAuth ,staticRoute);


app.get("/url/:shortId", handleGetOriginalURL);


app.listen(8080, 
    ()=>console.log("Server is running at port 8080"));