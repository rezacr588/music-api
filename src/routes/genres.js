const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const { validation, deleteSchema } = require("../middlewares/joiValidation");
const { joiSchema } = require("../models/genre");
const {
  create,
  index,
  patch,
  handleDelete,
} = require("../controllers/genreController");
const router = express.Router();
router
  .route("/")
  .get(index)
  .post(protect, authorize(10), validation(joiSchema), create)
  .patch(protect, authorize(10), validation(joiSchema), patch)
  .delete(protect, authorize(10), validation(deleteSchema), handleDelete);
module.exports = router;