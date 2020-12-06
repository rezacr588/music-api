const config = require('config');
const app = require('./apps/app');
require('./apps/middlewares')(app);
app.listen(config.get('port'));
