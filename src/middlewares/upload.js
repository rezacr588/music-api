const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
exports.s3Upload = multer({
  storage: multerS3({
    s3,
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
exports.Upload = multer({
  storage: multerS3({
    s3,
    bucket: function (req, file, cb) {
      cb(null, req.params.bucket);
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: function (req, file, cb) {
      cb(null, req.params.acl);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}${file.originalname}`);
    },
  }),
});
