const mongoose = require("mongoose");
module.exports = function (config) {
  console.log(config.dbConfig.connection);
  mongoose.connect(config.dbConfig.connection, config.dbConfig.options);
  mongoose.connection.once("open", () => console.log("db is connected!"));
};
