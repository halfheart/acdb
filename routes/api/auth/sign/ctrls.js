const User = require('../../../../models/users');
const jwt = require('jsonwebtoken');
const cfg = require('../../../../cfg/cfg');

exports.in = (req, res) => {
  const { email, pwd } = req.body;

  if (email === undefined) res.send({ success: false, msg: 'params err email' });
  if (pwd === undefined) res.send({ success: false, msg: 'params err pwd' });

  User.findOne({ email })
  .then((r) => {
    if (!r) throw new Error('존재하지 않는 이메일입니다');
    if (r.pwd !== pwd) throw new Error('비밀번호가 다릅니다');

    const secret = req.app.get('jwt-secret');
    const p = new Promise((resolve, reject) => {
      jwt.sign(
        {
          _id: r._id,
          email: r.email,
          username: r.username
        },
        secret,
        {
          expiresIn: '2m',
          issuer: cfg.web.host,
          subject: 'user-token'
        },
        (err, token) => {
          if (err) reject(err)
          resolve(token)
        }
      )
    });

    return p;
  })
  .then((tk) => {
    res.send({ success: true, token: tk });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  })
}

exports.out = (req, res) => {
  res.send({ success: true });
}
