const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3({
  accessKeyId: "fc3e37e2-0f10-418e-a7e5-9f86e2a99730",
  secretAccessKey:
    "d55edbca2d3959129f512ed965523e71ecd551df62c909da3556d2c8f02c9812",
  endpoint: "https://s3.ir-thr-at1.arvanstorage.com",
  s3ForcePathStyle: true,
});
exports.s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "musics",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}${file.originalname}`);
    },
  }),
});
exports.setUrl = (fieldName) => (req, res, next) => {
  req.body[fieldName] = req.file.location;
};
