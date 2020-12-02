const router = require('express').Router();
router.use('/musics', require('./musics'));
router.use('/artists', require('./artists'));
router.use('/genres', require('./genres'));
router.use('/users', require('./users'));
router.use('/roles', require('./roles'));
router.use('/userrole', require('./hybrid/userRole'));
router.use('/buckets', require('./buckets'));
module.exports = router;
