module.exports = function () {
  require("express-async-errors");
  process.on("uncaughtException", (ex) => {
    console.error(ex);
    process.exit(1);
  });
  process.on("unhandledRejection", (re) => {
    console.error(re);
    process.exit(1);
  });
};
