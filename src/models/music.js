const { Schema, model } = require("mongoose");
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
musicSchema.pre("save", async function (next) {
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
          this.highQuality = data.Location;
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
