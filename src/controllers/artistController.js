const _ = require("lodash");
const { Artist } = require("../models/artist");
exports.create = async (req, res) => {
  const filteredBody = _.pick(req.body, ["title", "cover"]);
  filteredBody.userId = req.user._id;
  const artist = await Artist.create(filteredBody);
  res.json(artist);
};
exports.patch = async (req, res) => {
  if (!req.body._id) return res.send("_id not exist");
  const filteredBody = _.pick(req.body, ["title", "cover"]);
  filteredBody.userId = req.user._id;
  const artist = await Artist.findByIdAndUpdate(req.body._id, filteredBody, {
    new: true,
  });
  res.json(artist);
};
exports.index = async (req, res) => {
  const artists = await Artist.find()
    .limit(req.limit)
    .skip(req.skip)
    .sort("-updatedAt");
  res.json(artists);
};
exports.handleDelete = async (req, res) => {
  if (!req.body.multiple) {
    const d = await Artist.deleteOne({
      _id: req.body._id,
    });
    res.send(d);
  } else {
    await Artist.deleteMany({
      _id: {
        $in: req.body._ids,
      },
    });
    res.send("multiple document deleted");
  }
};
