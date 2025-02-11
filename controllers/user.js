const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const {setUser} = require("../service/auth");

async function handleUserSignup(req,res){
    const {name, email, password } = req.body;
    await User.create({
       name,
       email,
       password
    });
    console.log("User register successfully!");
    res.redirect("/");
}

const handleUserLogin = async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user){
       return res.render("login.ejs",{error: "Invalid email or password!"});
    }
    console.log("user Login Successfully");

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    
    res.redirect("/");
}

module.exports = {handleUserSignup, handleUserLogin};