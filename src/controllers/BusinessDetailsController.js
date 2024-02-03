const { B_Details } = require("../models");

module.exports = {
  async get(req, res) {
    try {
      const obj = await B_Details.findOne({
        where: {
          id: 1,
        },
        attributes: {
          exclude: ["id"],
        },
      });
      return res.status(200).send(obj);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  async edit(req, res) {
    try {
      await B_Details.update(req.body, {
        where: {
          id: 1,
        },
      });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
};
