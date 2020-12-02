const s3 = require('../../apps/aws');
module.exports = {
  index(req, res) {
    s3.listBuckets(function (err, data) {
      if (err) {
        throw err;
      } else {
        res.json(data);
      }
    });
  },
  create(req, res) {
    const bucketParams = {
      Bucket: req.body.title,
    };
    s3.createBucket(bucketParams, function (err, data) {
      if (err) {
        throw err;
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
      if (err) {
        throw err;
      } else {
        res.json(data);
      }
    });
  },
};
