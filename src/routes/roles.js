const express = require("express");
const { validation, deleteSchema } = require("../middlewares/joiValidation");
const { protect, authorize } = require("../middlewares/auth");
const { joiSchema } = require("../models/role");
const {
  create,
  index,
  patch,
  handleDelete,
} = require("../controllers/roleController");
const router = express.Router();
router
  .route("/")
  .get(index)
  .post(protect, validation(joiSchema), create)
  .patch(protect, validation(joiSchema), patch)
  .delete(protect, validation(deleteSchema), handleDelete);
module.exports = router;
