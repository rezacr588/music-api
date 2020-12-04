const redis = require('../../apps/redis');
module.exports = {
  create(req, res) {
    res.json(req.file);
  },
  async redirect(req, res) {
    const { bucket, filename, id } = req.params;
    const result = await redis.lpush(`users:` + req.user._id, id);
    console.log(result);
    const redirectedUrl = `https://${bucket}.s3.ir-thr-at1.arvanstorage.com/${filename}`;
    res.redirect(redirectedUrl);
  },
};
