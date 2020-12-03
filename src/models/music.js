const { Schema, model } = require('mongoose');
const request = require('request');
const Joi = require('joi');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const musicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
    },
    cover: {
      type: String,
      required: true,
    },
    genres: {
      type: [
        new Schema({
          title: {
            type: String,
            required: true,
          },
          cover: {
            type: String,
            required: true,
          },
        }),
      ],
      required: true,
    },
    artists: {
      type: [
        new Schema({
          title: {
            type: String,
            required: true,
          },
          cover: {
            type: String,
            required: true,
          },
        }),
      ],
      required: true,
    },
    highQuality: {
      type: String,
    },
    mediumQuality: {
      type: String,
    },
    lowQuality: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);
musicSchema.pre('save', function (next) {
  if (!this.isModified('highQuality')) return next();
  request.get(this.highQuality).on('response', (response) => {
    if (200 == response.statusCode) {
      s3.upload(
        {
          Body: response,
          Bucket: 'musics',
          ACL: 'public-read',
          CacheControl: '5184000',
          Key: `${Date.now().toString()}.mp3`,
        },
        (err, data) => {
          this.highQuality = 'https://' + data.Location;
          next();
        },
      );
    } else {
      next(new Error('url is not valid'));
    }
  });
});
musicSchema.pre('save', function (next) {
  if (!this.isModified('mediumQuality')) return next();
  request.get(this.mediumQuality).on('response', (response) => {
    if (200 == response.statusCode) {
      s3.upload(
        {
          Body: response,
          Bucket: 'musics',
          ACL: 'public-read',
          CacheControl: '5184000',
          Key: `${Date.now().toString()}.mp3`,
        },
        (err, data) => {
          this.mediumQuality = 'https://' + data.Location;
          next();
        },
      );
    } else {
      next(new Error('url is not valid'));
    }
  });
});
musicSchema.pre('save', function (next) {
  if (!this.isModified('lowQuality')) return next();
  request.get(this.lowQuality).on('response', (response) => {
    if (200 == response.statusCode) {
      s3.upload(
        {
          Body: response,
          Bucket: 'musics',
          ACL: 'public-read',
          CacheControl: '5184000',
          Key: `${Date.now().toString()}.mp3`,
        },
        (err, data) => {
          this.lowQuality = 'https://' + data.Location;
          next();
        },
      );
    } else {
      next(new Error('url is not valid'));
    }
  });
});
exports.Schema = musicSchema;
exports.joiSchema = Joi.object({
  _id: Joi.objectId(),
  title: Joi.string().min(5).max(80).required(),
  cover: Joi.string().required(),
  genres: Joi.array().items(Joi.objectId()).required(),
  artists: Joi.array().items(Joi.objectId()).required(),
  highQuality: Joi.string(),
  mediumQuality: Joi.string(),
  lowQuality: Joi.string(),
});
exports.Music = model('Music', musicSchema);
