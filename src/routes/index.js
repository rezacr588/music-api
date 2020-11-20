const express = require("express");
const router = express.Router();
const musics = require("./musics");
const artists = require("./artists");
const genres = require("./genres");
router.use("/musics", musics);
router.use("/artists", artists);
router.use("/genres", genres);
module.exports = router;
