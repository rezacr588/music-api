const { Schema, model } = require("mongoose");
const aws = require("aws-sdk");
const request = require("request");
const Joi = require("joi");
const musicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    genres: {
      type: [
        new Schema({
          title: {
            type: String,
            required: true,
          },
          cover: {
            type: String,
            required: true,
          },
        }),
      ],
      required: true,
    },
    artists: {
      type: [
        new Schema({
          title: {
            type: String,
            required: true,
          },
          cover: {
            type: String,
            required: true,
          },
        }),
      ],
      required: true,
    },
    highQuality: {
      type: String,
    },
    mediumQuality: {
      type: String,
    },
    lowQuality: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
const s3 = new aws.S3({
  accessKeyId: "fc3e37e2-0f10-418e-a7e5-9f86e2a99730",
  secretAccessKey:
    "d55edbca2d3959129f512ed965523e71ecd551df62c909da3556d2c8f02c9812",
  endpoint: "https://s3.ir-thr-at1.arvanstorage.com",
  s3ForcePathStyle: true,
});
musicSchema.pre("save", function (next) {
  if (!this.isModified("highQuality")) return next();
  request.get(this.highQuality).on("response", (response) => {
    if (200 == response.statusCode) {
      s3.upload(
        {
          Body: response,
          Bucket: "musics",
          ACL: "public-read",
          CacheControl: "5184000",
          Key: `${Date.now().toString()}.mp3`,
        },
        (err, data) => {
          this.highQuality = "https://" + data.Location;
          next();
        },
      );
    } else {
      throw new Error("url is not valid");
    }
  });
});
exports.Schema = musicSchema;
exports.joiSchema = Joi.object({
  _id: Joi.objectId(),
  title: Joi.string().min(5).max(80).required(),
  cover: Joi.string().required(),
  genres: Joi.array().items(Joi.objectId()).required(),
  artists: Joi.array().items(Joi.objectId()).required(),
  highQuality: Joi.string(),
  mediumQuality: Joi.string(),
  lowQuality: Joi.string(),
});
exports.Music = model("Music", musicSchema);
