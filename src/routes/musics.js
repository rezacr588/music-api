const express = require("express");
const { validation, deleteSchema } = require("../middlewares/joiValidation");
const { protect, authorize } = require("../middlewares/auth");
const paginate = require("../middlewares/paginate");
const { joiSchema } = require("../models/music");
const {
  create,
  index,
  patch,
  handleDelete,
} = require("../controllers/musicController");
const router = express.Router();
router
  .route("/")
  .get(paginate, index)
  .post(protect, authorize(10), validation(joiSchema), create)
  .patch(protect, authorize(10), validation(joiSchema), patch)
  .delete(protect, authorize(10), validation(deleteSchema), handleDelete);
module.exports = router;
