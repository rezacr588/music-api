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
  },
  { timestamps: true },
);
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
