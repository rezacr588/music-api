const AWS = require('aws-sdk');
const config = require('config');
AWS.config.update({ region: 'ir-thr-at1' });
const s3 = new AWS.S3({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  endpoint: config.get('endpoint'),
  s3ForcePathStyle: true,
});
module.exports = s3;
