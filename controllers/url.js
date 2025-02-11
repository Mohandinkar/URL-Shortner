const shortid = require("short-id");
const URL = require("../models/url");

const handleGenerateNewShortURL = async(req,res)=>{
    const orgURL = req.body.url;
    if(!orgURL) return res.status(400).json({error:"URL is required"});
    const shortID = shortid.generate();

    await URL.create({
        shortId :shortID,
        redirectURL : orgURL,
        visitHistory : [],
        createdBy:req.user._id,
    });
    res.render("Home.ejs",{id:shortID});
    // return res.json({id: shortID});

}  

const handleGetOriginalURL = async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId:shortId},
        {$push:{
            visitHistory:{
                timestamp:Date.now()
            },
        }}
    );

    res.redirect(entry.redirectURL);

}

const handleGetAnalytics = async(req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId:shortId});
    res.json({totalClicks:result.visitHistory.length,
        analytics: result.visitHistory
    }
    );

}

module.exports = {handleGenerateNewShortURL, handleGetOriginalURL,handleGetAnalytics};