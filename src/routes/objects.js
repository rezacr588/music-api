const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { Upload } = require('../middlewares/upload');
const { create, redirect } = require('../controllers/objectController');
const router = express.Router();
router.post(
  '/:acl/:bucket',
  protect,
  authorize(10),
  Upload.single('data'),
  create,
);
router.get('/:bucket/:filename/:id', protect, redirect);
module.exports = router;
