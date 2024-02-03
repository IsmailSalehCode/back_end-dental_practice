const Joi = require("joi");
const onlyLetters = /^([^0-9!@#$%^&*()\-_+/\\,.<>='"|{};[\]]*)$/;
const regexMail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
function validateSchema(schema, body, res, next) {
  const validation = schema.validate(body);
  if (validation.error) {
    console.log(validation.error);
    return res.sendStatus(400);
  } else {
    next();
  }
}
module.exports = {
  addForm(req, res, next) {
    const schema = Joi.object({
      isNewPatient: Joi.boolean().required(),
      helpWith: Joi.string()
        .valid(
          "not sure",
          "emergency/tooth pain",
          "dental implants consult",
          "invisalign consult",
          "teeth whitening",
          "teeth cleaning adult",
          "teeth cleaning child"
        )
        .required(),
      name: Joi.string().required().max(300).min(3).regex(onlyLetters),
      phone: Joi.string().required().max(22),
      email: Joi.string().regex(regexMail).required(),
      message: Joi.string().required().max(500).allow(null, ""),
      appointmentDateTimeId: Joi.number().required(),
    });

    validateSchema(schema, req.body, res, next);
  },
  addDateTime(req, res, next) {
    const schema = Joi.object({
      datetime: Joi.date().required(),
    });
    validateSchema(schema, req.body, res, next);
  },
};
