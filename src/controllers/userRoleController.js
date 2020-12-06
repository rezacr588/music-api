const { Role } = require("../models/role");
const { User } = require("../models/user");
const _ = require("lodash");
exports.setRoleForUser = async (req, res) => {
  const filteredBody = _.pick(req.body, ["role", "user"]);
  const role = await Role.findById(filteredBody.role);
  const user = await User.findByIdAndUpdate(filteredBody.user, {
    role,
  });
  res.json(user);
};
