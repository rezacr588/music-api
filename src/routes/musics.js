const express = require("express");
const { validation, deleteSchema } = require("../middlewares/joiValidation");
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
  .get(index)
  .post(validation(joiSchema), create)
  .patch(validation(joiSchema), patch)
  .delete(validation(deleteSchema), handleDelete);
module.exports = router;
