const { Schema, model } = require("mongoose");
const Joi = require("joi");
const genreSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
exports.Schema = genreSchema;
exports.joiSchema = Joi.object({
  _id: Joi.objectId(),
  title: Joi.string().required(),
  cover: Joi.string().required(),
});
exports.Genre = model("Genre", genreSchema);
