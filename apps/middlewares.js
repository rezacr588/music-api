const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const bodyParser = require("body-parser");
module.exports = function (app) {
  require("dotenv").config();
  app.use(require("morgan")("tiny"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api", require("../src/routes/index"));
  app.use(require("../src/middlewares/error"));
};
