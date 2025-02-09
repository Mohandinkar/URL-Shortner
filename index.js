const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const connectDB = require("./connect");

const {handleGetOriginalURL} = require("./controllers/url")

connectDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb Connected"))
.catch((err)=>console.log("Not connected",err));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", handleGetOriginalURL);

app.listen(8080, 
    ()=>console.log("Server is running at port 8080"));