const mongoose = require("mongoose");
module.exports = function (config) {
  console.log(config.dbConfig.connection);
  mongoose
    .connect(config.dbConfig.connection, config.dbConfig.options)
    .then(() => {
      console.log("db is connected");
    });
};
