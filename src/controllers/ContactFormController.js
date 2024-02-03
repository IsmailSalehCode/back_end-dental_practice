const { ContactForm } = require("../models");
const { DateTime } = require("luxon");

function UTC_to_SofiaTZ(objs) {
  const result = [];
  for (let i = 0; i < objs.length; i++) {
    let element = objs[i];
    const iterISO = new Date(element.createdAt).toISOString();
    const luxonDT = DateTime.fromISO(iterISO).setZone("Europe/Sofia");
    // element["createdAt"] = luxonDT.toFormat("y-LL-dd HH:mm"); doesnt work; neither does element.createdAt=
    result.push({
      id: element.id,
      name: element.name,
      email: element.email,
      phone: element.phone,
      message: element.message,
      createdAt: luxonDT.toFormat("y-LL-dd HH:mm"),
    });
  }
  return result;
}
module.exports = {
  async get(req, res) {
    try {
      const objs = await ContactForm.findAll({
        attributes: {
          exclude: ["updatedAt"],
        },
      });
      // to Sofia timezone=======================
      const result = UTC_to_SofiaTZ(objs);
      //=========================================
      return res.status(200).send(result);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  async add(req, res) {
    try {
      await ContactForm.create(req.body);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  async delete(req, res) {
    try {
      const objToDestroy = req.form;

      await objToDestroy.destroy();

      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};
