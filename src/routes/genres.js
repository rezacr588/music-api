const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { setUrl, s3Upload } = require('../middlewares/upload');
const queryString = require('../middlewares/queryString');
const { validation, deleteSchema } = require('../middlewares/joiValidation');
const { joiSchema } = require('../models/genre');
const {
  create,
  index,
  patch,
  handleDelete,
} = require('../controllers/genreController');
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
