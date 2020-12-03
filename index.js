const cluster = require('cluster');
const config = require('config');
const app = require('./apps/app');
if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  require('./apps/middlewares')(app);
  app.listen(config.get('port'));
}
