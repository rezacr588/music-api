const express = require("express");
const {
  validation,
  userRoleSchema,
} = require("../../middlewares/joiValidation");
const { protect, authorize } = require("../../middlewares/auth");
const { setRoleForUser } = require("../../controllers/userRoleController");
const router = express.Router();
router.use(protect, authorize(10));
router
  .route("/")
  .post(protect, authorize(10), validation(userRoleSchema), setRoleForUser);
module.exports = router;
