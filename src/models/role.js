const { Schema, model } = require("mongoose");
const Joi = require("joi");
const roleSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    code: {
      type: Number,
      unique: true,
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
exports.Schema = roleSchema;
exports.joiSchema = Joi.object({
  _id: Joi.objectId(),
  title: Joi.string().required(),
  code: Joi.number().required(),
});
exports.Role = model("Role", roleSchema);
