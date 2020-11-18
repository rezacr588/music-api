const express = require("express");
const config = require("config");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.Music.server.port, () => {
  console.log(`Music API is listening`);
});
