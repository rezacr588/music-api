const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const request = require("request");
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
exports.musicUpload = async (req, res, next) => {
  if (req.body.highQuality) {
    const highQualityData = await streamUploadToAws(req.body.highQuality);
    req.body.highQuality = highQualityData.Location;
  }
  if (req.body.mediumQuality) {
    const mediumQualityData = await streamUploadToAws(
      req.body.mediumQualityData,
    );
    req.body.mediumQuality = mediumQualityData.Location;
  }
  next();
};
function streamUploadToAws(url) {
  return new Promise((resolve, reject) => {
    request.get(url).on("response", function (response) {
      if (200 == response.statusCode) {
        s3.upload(
          {
            Body: response,
            Bucket: "musics",
            ACL: "public-read",
            CacheControl: "5184000",
            Key: `${Date.now().toString()}.mp3`,
          },
          function (err, data) {
            resolve(data);
            reject(err);
          },
        );
      } else {
        reject(new Error("url is not valid"));
      }
    });
  });
}
