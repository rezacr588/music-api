const AWS = require('aws-sdk');
const s3 = new AWS.S3();
module.exports = {
  index(req, res) {
    s3.listBuckets(function (err, data) {
      console.log(err, data);
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  },
  create(req, res) {
    const params = {
      Bucket: req.body.title,
      CreateBucketConfiguration: {
        LocationConstraint: '',
      },
    };
    s3.createBucket(params, function (err, data) {
      console.log(err, data);
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  },
  remove(req, res) {
    const bucketParams = {
      Bucket: req.body.title,
    };
    s3.deleteBucket(bucketParams, function (err, data) {
      console.log(err, data);
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  },
};
