const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { Upload } = require('../middlewares/upload');
const { create } = require('../controllers/objectController');
const router = express.Router();
router.route('/').post(protect, authorize(10), Upload()('data'), create);
module.exports = router;
