const router = require('express').Router();
const ctrl = require('./ctrls');
const comment = require('./comment');

router.use('/comment', comment);

router.get('/', ctrl.list);
router.get('/:_id', ctrl.deck);
router.get('/read/:_id', ctrl.read);
router.post('/', ctrl.add);
router.put('/', ctrl.mod);
router.delete('/', ctrl.del);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}`});
});

module.exports = router;
