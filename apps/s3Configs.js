const AWS = require('aws-sdk');
const config = require('config');
module.exports = function () {
  AWS.config.update({
    accessKeyId: config.get('accessKeyId'),
    secretAccessKey: config.get('secretAccessKey'),
    endpoint: config.get('endpoint'),
    region: '',
    s3ForcePathStyle: true,
  });
}