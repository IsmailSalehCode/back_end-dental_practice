const { AppointmentDateTime } = require("../models");
//see if it works without const { AppointmentDateTime,Sequelize } = require("../models");
module.exports = async function (req, res, next) {
  const id = req.params.id || req.body.appointmentDateTimeId;
  //req.body.appointmentDateTimeId from POST route add appointment form
  const obj = await AppointmentDateTime.findByPk(id);
  if (obj == null) {
    console.log("MISSING AppointmentDateTime");
    return res.sendStatus(404);
  } else {
    req.obj = obj;
    return next();
  }
};
