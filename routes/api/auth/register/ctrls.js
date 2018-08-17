const User = require('../../../../models/users');

exports.add = (req, res) => {
  const {
    email,
    pwd,
    username
  } = req.body;

  if (email === undefined) res.send({ success: false, msg: 'params err email' });
  if (pwd === undefined) res.send({ success: false, msg: 'params err pwd' });
  if (username === undefined) res.send({ success: false, msg: 'params err username' });

  User.findOne({ email })
  .then((r) => {
    if (r) throw new Error('중복되는 이메일');
    return User.findOne({ username })
  })
  .then((r) => {
    if (r) throw new Error('중복되는 사용자명');
    const u = new User({
      email,
      pwd,
      username
    });
    return u.save()
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}
