const fetch = require("node-fetch");
const { stringify } = require("querystring");

module.exports = async function (req, res, next) {
  if (!req.headers.captcha) {
    res.status(400).send({
      msg: "rules.missingCaptcha.",
    });
  }
  const secretKey = process.env.CAPTCHA_SECRET_KEY;
  const query = stringify({
    secret: secretKey,
    response: req.headers.captcha,
    remoteip: req.connection.remoteAddress,
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  // Make a request to verifyURL
  const body = await fetch(verifyURL).then((res) => res.json());
  // If not successful
  if (body.success !== undefined && body.success == false) {
    return res.status(400);
    //your captcha is invalid
  } else {
    // If successful
    return next();
  }
};
