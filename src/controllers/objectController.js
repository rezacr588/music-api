const config = require('config');
module.exports = {
  create(req, res) {
    res.json(req.file);
  },
  redirect(req, res) {
    const redirectedUrl = `https://${req.params.bucket}.s3.ir-thr-at1.arvanstorage.com/${req.params.filename}`;
    res.redirect(redirectedUrl);
  },
};
