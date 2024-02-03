const Sequelize = require("sequelize");

const db = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: "mysql",
  options: {
    host: process.env.HOST,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
});

module.exports = {
  port: process.env.PORT,
  db,
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
