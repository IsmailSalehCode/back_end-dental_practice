//run with npm start
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const {
  User,
  B_Details,
  SiteDesignConfig,
  sequelize,
} = require("./src/models");
const config = require("./src/config/config");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(cors());
// parse requests of content-type - application/json v
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded v
app.use(
  express.urlencoded({
    extended: true,
  })
);
require("./src/passport");

require("./src/routes")(app);

sequelize
  //TODO: remove force for prod env
  .sync({ force: true })
  .then(async () => {
    await insertUsers();
    await insertBusinessDetails();
    await insertSiteDesignConfig();
    app.listen(config.port);
    console.log("Server started");
  })
  .catch((err) => console.log("in app.js: " + err));

async function insertUsers() {
  // enabled by default
  await User.create({
    username: "dany",
    email: "dany@de-dental.com",
    password: "aA@12345",
    phone: "0889907011",
    role: "Manager",
  });
  await User.create({
    username: "evgeny",
    email: "evgeny@de-dental.com",
    password: "aB@12345",
    phone: "0889957011",
    role: "Employee",
  });
}

async function insertBusinessDetails() {
  await B_Details.create({
    workingHours: "10:00 - 17:00",
    phone: "+359 88 990 7045",
  });
}

async function insertSiteDesignConfig() {
  await SiteDesignConfig.create({
    wants_appointmentScheduling: 1,
    wants_webMessage: 0,
  });
}
