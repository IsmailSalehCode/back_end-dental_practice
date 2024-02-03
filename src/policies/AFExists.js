const { AppointmentForm, Sequelize } = require("../models");
module.exports = async function (req, res, next) {
  const formId = req.params.id;
  const form = await AppointmentForm.findByPk(formId);
  if (form == null) {
    console.log("MISSING AFORM");
    return res.sendStatus(404);
  } else {
    req.form = form;
    return next();
  }
};
