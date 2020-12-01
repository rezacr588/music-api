module.exports = function (req, res, next) {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;
  req.skip = skip;
  req.limit = limit;
  req.$search = buildQuery(req.query);
  next();
};
const buildQuery = (criteria) => {
  const query = {};
  if (criteria.name) {
    query.$text = {
      $search: criteria.title
    };
  }
  if (criteria.genres) {
    query.genres = {
      $in: criteria.genres
    };
  }
  if (criteria.artists) {
    query.artists = {
      $in: criteria.artists
    };
  }
  return query;
};
