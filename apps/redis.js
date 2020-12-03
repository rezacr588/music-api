const Redis = require('ioredis');
const redisObject = new Redis({
  port: 15033, // Redis port
  host: 'redis-15033.c240.us-east-1-3.ec2.cloud.redislabs.com', // Redis host
  password: 'qXX8rTGqBR0wTW9EtE0k7v8oKTXp3W2h',
});
module.exports = redisObject;
