const AWS = require('aws-sdk');
const config = require('config');
AWS.config.update({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  endpoint: config.get('endpoint'),
  region: '',
  s3ForcePathStyle: true,
});
const s3 = new AWS.S3();
module.exports = s3;
