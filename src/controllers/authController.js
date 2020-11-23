const _ = require("lodash");
const { User } = require("../models/user");
const { Role } = require("../models/role");

exports.register = async (req, res) => {
  const filteredBody = _.pick(req.body, ["name", "email", "password"]);
  filteredBody.role = await Role.findOne({ code: 0 });
  let user = new User(filteredBody);
  user = await user.save();
  res.json(_.pick(user, ["name", "email"]));
};

exports.login = async (req, res) => {
  const filteredBody = _.pick(req.body, ["email", "password"]);
  const user = await User.findOne({ email: filteredBody.email });
  const isMatch = await user.comparePassword(filteredBody.password);
  if (!isMatch) throw new Error("password mismatch");
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).json(_.pick(user, ["name", "email"]));
};
