require('./apps/handleerrors')();
const config = require('config');
require('./apps/mongo')(config);
const app = require('./apps/app');
require('./apps/middlewares')(app);
app.listen(config.get('port'));
