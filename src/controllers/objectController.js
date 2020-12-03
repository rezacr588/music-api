module.exports = {
  create(req, res) {
    console.log('====================================');
    console.log(req.file);
    console.log('====================================');
    res.json(req.file);
  },
};
