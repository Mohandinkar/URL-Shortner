const {getUser} = require("../service/auth");

module.exports.restrictToLoggedinUserOnly = (req, res, next) => {
  const userUid = req.cookie?.uid;
  if (!userUid) {
    res.redirect("/login");
  }
  const user = getUser(userUid);
  if (!user) {
    res.redirect("/login");
  }

  next();
};


