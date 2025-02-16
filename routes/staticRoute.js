const express = require("express");
const URL = require("../models/url");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.get("/admin/urls",authMiddleware.restrictTo(["ADMIN"]),async(req, res)=>{
    const allUrls = await URL.find({});
    const id = null;
    res.render("Home.ejs",{urls:allUrls, id:id});
});

router.get("/",authMiddleware.restrictTo(["NORMAL","ADMIN"]),async (req,res)=>{
    console.log("home page");
   
    const allUrls = await URL.find({ createdBy : req.user._id});
    const id = null;
    res.render("Home.ejs",{urls:allUrls, id:id});
});

router.get("/signUp", (req,res)=>{
    res.render("signUp.ejs");
}
);

router.get("/login", (req, res)=>{
    res.render("login.ejs",{ error: null });
})

module.exports = router;