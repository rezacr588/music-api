require("./apps/handleerrors")();
const config = require("config");
require("./apps/mongo")(config);
const app = require("express")();
require("./apps/middlewares")(app);
app.listen(config.get("port"), () => {
  console.log(`Music API is running on ` + process.env.NODE_ENV);
});
