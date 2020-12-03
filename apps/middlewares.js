const Joi = require('joi');
const config = require('config');
const bodyParser = require('body-parser');
module.exports = function (app) {
  require('./s3Configs')();
  Joi.objectId = require('joi-objectid')(Joi);
  require('./handleerrors')();
  require('./mongo')(config);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api', require('../src/routes/index'));
  app.use(require('../src/middlewares/error'));
  app.use('/', (req, res, next) =>
    res.status(404).json({ message: 'Not found' }),
  );
};
