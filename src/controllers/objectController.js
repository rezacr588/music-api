const AWS = require('aws-sdk');
const redis = require('../../apps/redis');

const s3 = new AWS.S3();
module.exports = {
  create(req, res) {
    res.json(req.file);
  },
  remove(req, res) {
    const { bucket, key } = req.params;
    const result = s3.deleteObject({ Bucket: bucket, Key: key }).promise();
    res.json(result);
  },
  async index(req, res) {
    let objects = await s3.listObjects({
      Bucket: req.params.bucket
    }).promise();
    objects = objects.Contents.map(obj => obj);
    res.json(objects);
  },
  async redirect(req, res) {
    const { bucket, filename, id } = req.params;
    await redis.lpush(`users:` + req.user._id, id);
    const redirectedUrl = `https://${bucket}.s3.ir-thr-at1.arvanstorage.com/${filename}`;
    res.redirect(redirectedUrl);
  },
};
