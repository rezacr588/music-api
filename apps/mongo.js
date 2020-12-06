const mongoose = require('mongoose');
module.exports = function (config) {
  mongoose.connect(config.dbConfig.connection, config.dbConfig.options);
};
