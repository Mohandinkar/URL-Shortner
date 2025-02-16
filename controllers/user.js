const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  console.log("User register successfully!");
  res.redirect("/login");
}

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login.ejs", {
      error: "Invalid email or password!",
      user: user,
    });
  }
  console.log("user Login Successfully");

  //stateless authentication
  const token = setUser(user);
  res.cookie("uid", token);
   res.redirect("/");
};

function handleUserLogout(req, res) {
  res.cookie("uid", " ", { maxAge: 1 });
 
  res.redirect("/login");
}

module.exports = { handleUserSignup, handleUserLogin, handleUserLogout };
