const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { index, create, remove } = require('../controllers/bucketController');
express
  .Router()
  .route('/')
  .get(protect, authorize(10), index)
  .post(protect, authorize(10), create)
  .delete(protect, authorize(10), remove);
module.exports = router;
