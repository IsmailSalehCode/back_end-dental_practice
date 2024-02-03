const passport = require("passport");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", function (err, user) {
    if (user.role !== "Manager") {
      return res.sendStatus(401);
      //Wrong login credentials
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
