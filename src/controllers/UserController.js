const { User } = require("../models");
const { DateTime } = require("luxon");

function UTC_to_SofiaTZ(objs) {
  const result = [];
  for (let i = 0; i < objs.length; i++) {
    let element = objs[i];
    const iterISO_createdAt = new Date(element.createdAt).toISOString();
    const iterISO_updatedAt = new Date(element.updatedAt).toISOString();
    const luxonDT_createdAt =
      DateTime.fromISO(iterISO_createdAt).setZone("Europe/Sofia");
    const luxonDT_updatedAt =
      DateTime.fromISO(iterISO_updatedAt).setZone("Europe/Sofia");

    result.push({
      id: element.id,
      username: element.username,
      password: element.password,
      email: element.email,
      phone: element.phone,
      otherContact: element.otherContact,
      role: element.role,
      enabled: element.enabled,
      createdAt: luxonDT_createdAt.toFormat("y-LL-dd HH:mm"),
      updatedAt: luxonDT_updatedAt.toFormat("y-LL-dd HH:mm"),
    });
  }
  return result;
}
module.exports = {
  async getUsers(req, res) {
    try {
      let users = null;

      users = await User.findAll();

      // to Sofia timezone=======================
      const result = UTC_to_SofiaTZ(users);
      //=========================================
      return res.status(200).send(result);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  async deleteUser(req, res) {
    try {
      const userToDestroy = req.obj;

      await userToDestroy.destroy();

      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },

  async toggleUser(req, res) {
    try {
      const user = req.obj;

      let isEnabled = user.enabled;
      user.enabled = !isEnabled;

      await user.save();

      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },

  async editUser(req, res) {
    try {
      const userId = req.params.id;

      await User.update(req.body, {
        where: {
          id: userId,
        },
      });

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
