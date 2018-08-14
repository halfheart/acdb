const Card = require('../../../../models/cards');
const EJSON = require('mongodb-extjson');

exports.list = (req, res) => {
  res.send({ success: false, msg: 'card list 준비중' });
}

exports.card = (req, res) => {
  res.send({ success: false, msg: 'card 준비중' });
}

exports.add = (req, res) => {
  res.send({ success: false, msg: 'card add 준비중' });
}

exports.mod = (req, res) => {
  res.send({ success: false, msg: 'card mod 준비중' });
}

exports.del = (req, res) => {
  res.send({ success: false, msg: 'card del 준비중' });
}
