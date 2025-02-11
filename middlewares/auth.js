const { getUser } = require("../service/auth");

module.exports.restrictToLoggedinUserOnly = (req, res, next) => {
  // console.log(req);
  const userUid = req.cookies?.uid;

  if (!userUid) {
    res.redirect("/login");
  }
  const user = getUser(userUid);
  if (!user) {
    res.redirect("/login");
  }
  req.user = user;
  console.log(req.user);
  next();
};


module.exports.checkAuth = (req, res, next) => {
    // console.log(req);
    const userUid = req.cookies?.uid;
 
    const user = getUser(userUid);
    req.user = user;

    next();
  };