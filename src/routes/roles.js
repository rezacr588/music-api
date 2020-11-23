const express = require("express");
const { validation, deleteSchema } = require("../middlewares/joiValidation");
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
  .post(validation(joiSchema), create)
  .patch(validation(joiSchema), patch)
  .delete(validation(deleteSchema), handleDelete);
module.exports = router;
