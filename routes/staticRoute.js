const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/",async (req,res)=>{
    console.log("home page");
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({ createdBy : req.user._id});
    res.render("Home.ejs",{urls:allUrls});
})

router.get("/signUp", (req,res)=>{
    res.render("signUp.ejs");
}
);

router.get("/login", (req, res)=>{
    res.render("login.ejs");
})

module.exports = router;