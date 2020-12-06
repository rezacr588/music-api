const _ = require("lodash");
const { Genre } = require("../models/genre");
exports.create = async (req, res) => {
  const filteredBody = _.pick(req.body, ["title", "cover"]);
  filteredBody.userId = req.user._id;
  const genre = await Genre.create(filteredBody);
  res.json(genre);
};
exports.patch = async (req, res) => {
  if (!req.body._id) return res.send("_id not exist");
  const filteredBody = _.pick(req.body, ["title", "cover"]);
  filteredBody.userId = req.user._id;
  const genre = await Genre.findByIdAndUpdate(req.body._id, filteredBody, {
    new: true,
  });
  res.json(genre);
};
exports.index = async (req, res) => {
  const genres = await Genre.find()
    .limit(req.limit)
    .skip(req.skip)
    .sort("-updatedAt");
  res.json(genres);
};
exports.handleDelete = async (req, res) => {
  if (!req.body.multiple) {
    await Genre.deleteOne({
      _id: req.body._id,
    });
    res.send("one document deleted");
  } else {
    await Genre.deleteMany({
      _id: {
        $in: req.body._ids,
      },
    });
    res.send("multiple document deleted");
  }
};
