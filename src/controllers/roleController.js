const _ = require("lodash");
const { Role } = require("../models/role");
exports.create = async (req, res) => {
  const filteredBody = _.pick(req.body, ["title", "code"]);
  filteredBody.userId = req.user._id;
  const genre = await Role.create(filteredBody);
  res.json(genre);
};
exports.patch = async (req, res) => {
  if (!req.body._id) throw new Error("There is no such id");
  const filteredBody = _.pick(req.body, ["title", "code"]);
  filteredBody.userId = req.user._id;
  const role = await Role.findByIdAndUpdate(req.body._id, filteredBody, {
    new: true,
  });
  res.json(role);
};
exports.index = async (req, res) => {
  const roles = await Role.find()
    .limit(req.limit)
    .skip(req.skip)
    .sort("-updatedAt");
  res.json(roles);
};
exports.handleDelete = async (req, res) => {
  if (!req.body.multiple) {
    await Role.deleteOne({
      _id: req.body._id,
    });
    res.send("one document deleted");
  } else {
    await Role.deleteMany({
      _id: {
        $in: req.body._ids,
      },
    });
    res.send("multiple document deleted");
  }
};
