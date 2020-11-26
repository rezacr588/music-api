const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: new Schema({
      code: {
        type: Number,
        required: true,
      },
    }),
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      code: this.role.code || 0,
    },
    config.get("jwtSecretKey"),
  );
  return token;
};
exports.Schema = userSchema;
exports.User = model("User", userSchema);
exports.joiSchema = Joi.object({
  _id: Joi.objectId(),
  name: Joi.string().min(3).max(70).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  role: Joi.objectId(),
});
