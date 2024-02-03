const { SiteDesignConfig } = require("../models");
const siteDesignConfigRow = 1;

module.exports = {
  async get(req, res) {
    try {
      const obj = await SiteDesignConfig.findOne({
        where: {
          id: siteDesignConfigRow,
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
      await SiteDesignConfig.update(req.body, {
        where: {
          id: siteDesignConfigRow,
        },
      });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
};
