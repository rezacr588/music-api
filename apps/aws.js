const AWS = require('aws-sdk');
const config = require('config');
const s3 = new AWS.S3({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  endpoint: config.get('endpoint'),
  region: 'ir-thr-at1',
  s3ForcePathStyle: true,
});
module.exports = s3;
