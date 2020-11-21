require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const config = require("config");
const Joi = require("joi");
require("express-async-errors");
const { error } = require("./src/middlewares/error");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
mongoose.connect(config.dbConfig.connection, config.dbConfig.options);
const app = express();
app.use(require("morgan")("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", require("./src/routes/index"));
app.use(error);
app.listen(config.serverConfig.port, () => {
  console.log(`Music API is running`);
});
