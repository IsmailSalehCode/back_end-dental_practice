const Joi = require("joi");
const onlyLetters = /^([^0-9!@#$%^&*()\-_+/\\,.<>='"|{};[\]]*)$/;
const regexMail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
function validateSchema(schema, body, res, next) {
  const validation = schema.validate(body);
  if (validation.error) {
    return res.sendStatus(400); //bad data podrazbira se ot status code-a
  } else {
    next();
  }
}
module.exports = {
  add(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required().max(300).min(3).regex(onlyLetters),
      phone: Joi.string().required().max(22).allow(null, ""),
      email: Joi.string().regex(regexMail).required(),
      message: Joi.string().required().max(1000).min(10),
    });

    validateSchema(schema, req.body, res, next);
  },
};
