const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../../apps/aws');
exports.s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'musics',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}${file.originalname}`);
    },
  }),
});
exports.setUrl = (fieldName) => (req, res, next) => {
  req.body[fieldName] = req.file.location;
  next();
};
