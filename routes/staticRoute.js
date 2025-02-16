const express = require("express");
const URL = require("../models/url");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.get("/admin/urls",authMiddleware.restrictTo(["ADMIN"]),async(req, res)=>{
    const allUrls = await URL.find({});
    const id = null;
    res.render("Home.ejs",{urls:allUrls, id:id,user:null});
});

router.get("/",authMiddleware.restrictTo(["NORMAL","ADMIN"]),async (req,res)=>{
    console.log("home page");
   
    const allUrls = await URL.find({ createdBy : req.user._id});
    const id = null;
    res.render("Home.ejs",{urls:allUrls, id:id, user:req.user});
});

router.get("/signUp", (req,res)=>{
    res.render("signUp.ejs",{user:null});
}
);

router.get("/login", (req, res)=>{
    res.render("login.ejs",{ error: null, user:null });
})

module.exports = router;