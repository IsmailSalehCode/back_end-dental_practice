const passport = require("passport");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", function (err, user) {
    if (err || !user) {
      return res.sendStatus(401);
    } else if (user.enabled === 0) {
      return res.sendStatus(403);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
