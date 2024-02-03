const { ContactForm, Sequelize } = require("../models");
module.exports = async function (req, res, next) {
  const formId = req.params.id;
  const form = await ContactForm.findByPk(formId);
  if (form == null) {
    console.log("MISSING CFORM");
    return res.sendStatus(404);
  } else {
    req.form = form;
    return next();
  }
};
