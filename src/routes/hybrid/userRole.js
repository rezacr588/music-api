const express = require("express");
const {
  validation,
  userRoleSchema,
} = require("../../middlewares/joiValidation");
const { setRoleForUser } = require("../../controllers/userRoleController");
const router = express.Router();
router.route("/").post(validation(userRoleSchema), setRoleForUser);
module.exports = router;
