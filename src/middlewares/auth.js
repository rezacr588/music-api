const jwt = require("jsonwebtoken");
const config = require("config");
exports.protect = function (req, res, next) {
  const token = req.header("x-auth-token");
  // if (!token)
  //   return res
  //     .status(401)
  //     .json({ message: "Access denied. no token provided" });
  const decoded = jwt.verify(token, config.get("jwtSecretKey"));
  req.user = decoded;
  next();
};
