const { Schema, model } = require("mongoose");
const Joi = require("joi");
const roleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
exports.Schema = roleSchema;
exports.joiSchema = Joi.object({
  _id: Joi.objectId(),
  title: Joi.string().required(),
});
exports.Role = model("Role", roleSchema);
