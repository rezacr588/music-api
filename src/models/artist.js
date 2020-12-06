const { Schema, model } = require('mongoose');
const Joi = require('joi');
const artistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      text: true
    },
    cover: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);
exports.Schema = artistSchema;
exports.joiSchema = Joi.object({
  _id: Joi.objectId(),
  title: Joi.string().required(),
  cover: Joi.string().required()
});
exports.Artist = model('Artist', artistSchema);
