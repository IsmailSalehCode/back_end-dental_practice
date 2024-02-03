const Joi = require("joi");
const regexPass =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.#!%*?&])[A-Za-z\d@^$!.#%*?&({})_/'"]{8,32}$/;

function validateSchema(schema, body, res, next) {
  const validation = schema.validate(body);
  if (validation.error) {
    // console.error(validation.error);
    // english letters only
    return res.sendStatus(400);
  } else {
    console.log("input passed backend validation");
    next();
  }
}

module.exports = {
  login(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().max(100).required(),
      password: Joi.string().max(300).regex(regexPass).required(),
    });

    validateSchema(schema, req.body, res, next);
  },
  register(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().max(100).required(),
      password: Joi.string().regex(regexPass).required(),
      email: Joi.string().email().max(320),
      phone: Joi.string().email().max(22).allow(null, ""),
      otherContact: Joi.string().max(500).allow(null, ""),
      enabled: 1,
      role: Joi.string().valid("Manager", "Employee").required(),
    });

    validateSchema(schema, req.body, res, next);
  },
};
