const cluster = require('cluster');
const app = require('./apps/app');
if (cluster.isMaster) {
  cluster.fork();
} else {
  require('./apps/middlewares')(app);
  app.listen(config.get('port'));
}
