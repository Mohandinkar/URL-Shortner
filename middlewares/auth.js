const { getUser } = require("../service/auth");

module.exports.checkForAuthenticaion = (req, res, next) => {
  // console.log(req);
  const tokenCookie = req.cookies?.uid;
  req.user = null;

  if (!tokenCookie) {
    return next();
  }
  const user = getUser(tokenCookie);

  req.user = user;
  console.log(req.user);
  next();
};

//authorization
module.exports.restrictTo=(roles = [])=>{
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");
    if(!roles.includes(req.user.role)){
      res.status(403).send({message:"You don't have permission to access this resource."});
      }
      next();
  }
}

