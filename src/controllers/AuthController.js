const { User, Sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  // async logout(req, res) {
  //   try {
  //     const requester = req.body;
  //     if (requester != undefined && requester != null) {
  //       return res.sendStatus(200);
  //     } else {
  //       return res.sendStatus(400);
  //     }
  //   } catch (err) {
  //     return res.sendStatus(500);
  //   }
  // }, if we track user activity
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return res.sendStatus(401);
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.sendStatus(401);
      }

      if (user.enabled === 0) {
        //forbidden - disabled account
        return res.sendStatus(403);
      }

      const userJson = user.toJSON();

      return res.status(200).send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  async register(req, res) {
    try {
      await User.create(req.body);
      return res.sendStatus(200);
    } catch (err) {
      if (
        err.errors != undefined &&
        err.errors[0].message == "username must be unique"
      ) {
        return res.sendStatus(409);
        //username must be unique
      } else {
        return res.sendStatus(500);
      }
    }
  },
};
