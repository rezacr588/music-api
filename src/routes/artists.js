const express = require("express");
const { validation, deleteSchema } = require("../middlewares/joiValidation");
const paginate = require("../middlewares/paginate");
const { joiSchema } = require("../models/artist");
const {
  create,
  index,
  patch,
  handleDelete,
} = require("../controllers/artistController");
const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(paginate, index)
  .post(protect, authorize(10), validation(joiSchema), create)
  .patch(protect, authorize(10), validation(joiSchema), patch)
  .delete(protect, authorize(10), validation(deleteSchema), handleDelete);
module.exports = router;
