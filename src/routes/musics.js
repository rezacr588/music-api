const express = require('express');
const { validation, deleteSchema } = require('../middlewares/joiValidation');
const { protect, authorize } = require('../middlewares/auth');
const { setUrl, s3Upload, musicUpload } = require('../middlewares/upload');
const queryString = require('../middlewares/queryString');
const { joiSchema } = require('../models/music');
const {
  create,
  index,
  patch,
  handleDelete,
} = require('../controllers/musicController');
const router = express.Router();
router
  .route('/')
  .get(protect, queryString, index)
  .post(
    protect,
    authorize(10),
    s3Upload.single('cover'),
    setUrl('cover'),
    validation(joiSchema),
    create,
  )
  .patch(protect, authorize(10), validation(joiSchema), patch)
  .delete(protect, authorize(10), validation(deleteSchema), handleDelete);
module.exports = router;
