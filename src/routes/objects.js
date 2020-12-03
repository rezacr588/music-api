const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { Upload } = require('../middlewares/upload');
const { create } = require('../controllers/objectController');
const router = express.Router();
router.post('/:acl/:bucket', protect, authorize(10), Upload, create);
module.exports = router;
