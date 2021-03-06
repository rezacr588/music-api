const { Music } = require('../models/music');
const { Artist } = require('../models/artist');
const { Genre } = require('../models/genre');
const _ = require('lodash');
exports.create = async (req, res) => {
  const filteredBody = _.pick(req.body, [
    'title',
    'cover',
    'highQuality',
    'mediumQuality',
    'lowQuality',
    'genres',
    'artists'
  ]);
  const artists = await Artist.find({
    _id: { $in: filteredBody.artists }
  });
  if (artists.length == 0) return res.send('artists not found');
  filteredBody.artists = artists;
  filteredBody.userId = req.user._id;
  const genres = await Genre.find({
    _id: { $in: filteredBody.genres }
  });
  if (genres.length == 0) return res.send('genres not found');
  filteredBody.genres = genres;
  filteredBody.userId = req.user._id;
  const music = await Music.create(filteredBody);
  res.json(music);
};
exports.patch = async (req, res) => {
  if (!req.body._id) return res.send('_id not exist');
  const filteredBody = _.pick(req.body, [
    'title',
    'cover',
    'highQuality',
    'mediumQuality',
    'lowQuality',
    'genres',
    'artists'
  ]);
  if (filteredBody.artists) {
    const artists = await Artist.find({
      _id: { $in: filteredBody.artists }
    });
    if (artists.length == 0) return res.send('artists not found');
    filteredBody.artists = artists;
  }
  if (filteredBody.genres) {
    const genres = await Genre.find({
      _id: { $in: filteredBody.genres }
    });
    if (genres.length == 0) return res.send('genres not found');
    filteredBody.genres = genres;
  }
  filteredBody.userId = req.user._id;
  const music = await Music.findByIdAndUpdate(req.body._id, filteredBody, {
    new: true
  });
  res.json(music);
};
exports.index = async (req, res) => {
  const musics = await Music.find(req.$search)
    .limit(req.limit)
    .skip(req.skip)
    .sort('-updatedAt');
  res.json(musics);
};
exports.handleDelete = async (req, res) => {
  if (!req.body.multiple) {
    await Music.deleteOne({
      _id: req.body._id
    });
    res.json({
      message: req.body._id + ' document with this _id deleted'
    });
  } else {
    await Music.deleteMany({
      _id: {
        $in: req.body._ids
      }
    });
    res.json({
      message: req.body._ids.toString() + ' documents with this _ids deleted'
    });
  }
};
