const express = require("express");
const { validation, loginSchema } = require("../middlewares/joiValidation");
const { joiSchema } = require("../models/user");
const { register, login } = require("../controllers/authController");
const router = express.Router();
router.post("/register", validation(joiSchema), register);
router.post("/login", validation(loginSchema), login);
module.exports = router;
