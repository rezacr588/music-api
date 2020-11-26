const express = require("express");
const {
  validation,
  userRoleSchema,
} = require("../../middlewares/joiValidation");
const { protect } = require("../../middlewares/auth");
const { setRoleForUser } = require("../../controllers/userRoleController");
const router = express.Router();
router.route("/").post(protect, validation(userRoleSchema), setRoleForUser);
module.exports = router;
