const router = require('express').Router();
const data = require('./data');
const auth = require('./auth');

router.all('*', (req, res, next) => {
  // middleware
  next();
})

router.use('/data', data);
router.use('/auth', auth);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}`});
});

module.exports = router;
