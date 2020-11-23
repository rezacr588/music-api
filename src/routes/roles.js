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
  .post(protect, authorize(10), validation(joiSchema), create)
  .patch(validation(joiSchema), patch)
  .delete(validation(deleteSchema), handleDelete);
module.exports = router;
