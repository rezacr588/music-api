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
exports.Upload = (req, res, next) => {
  const { bucket, acl } = req.params;
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: bucket,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      acl: acl,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, `${Date.now().toString()}${file.originalname}`);
      },
    }),
  })('data');
};
