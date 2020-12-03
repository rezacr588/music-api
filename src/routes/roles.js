const express = require('express');
const { validation, deleteSchema } = require('../middlewares/joiValidation');
const queryString = require('../middlewares/queryString');
const { protect, authorize } = require('../middlewares/auth');
const { joiSchema } = require('../models/role');
const {
  create,
  index,
  patch,
  handleDelete,
} = require('../controllers/roleController');
const router = express.Router();
router.use(protect, authorize(10));
router
  .route('/')
  .get(protect, authorize(10), queryString, index)
  .post(protect, authorize(10), validation(joiSchema), create)
  .patch(protect, authorize(10), validation(joiSchema), patch)
  .delete(protect, authorize(10), validation(deleteSchema), handleDelete);
module.exports = router;
