const { User } = require("../models");
module.exports = async function (req, res, next) {
  const objId = req.params.id;
  const obj = await User.findByPk(objId);
  if (obj == null) {
    // console.log("MISSING User");
    return res.sendStatus(404);
  } else {
    req.obj = obj;
    return next();
  }
};
