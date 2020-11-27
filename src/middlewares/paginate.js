module.exports = function (req, res, next) {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;
  req.skip = skip;
  req.limit = limit;
  next();
};
