const Comment = require('../../../../../models/comments');
const Deck = require('../../../../../models/decks');
const EJSON = require('mongodb-extjson');

exports.list = (req, res) => {
  let {
    draw,
    skip,
    limit,
    order,
    sort,
    query
  } = req.query;

  if (draw === undefined) res.send({ success: false, msg: 'params err draw' });
  if (skip === undefined) res.send({ success: false, msg: 'params err skip' });
  if (limit === undefined) res.send({ success: false, msg: 'params err limit' });
  if (order === undefined) res.send({ success: false, msg: 'params err order' });
  if (sort === undefined) res.send({ success: false, msg: 'params err sort' });
  if (query === undefined) res.send({ success: false, msg: 'params err query' });

  skip = parseInt(skip);
  limit = parseInt(limit);
  sort = parseInt(sort);
  query = EJSON.parse(query);

  let d = {
    cnt: 0,
    draw: 0,
    ds: []
  };

  Comment.count(query)
  .then((c) => {
    d.cnt = c;
    let s = {};
    s[order] = sort;
    return Comment.find(query)
      .skip(skip)
      .limit(limit)
      .sort(s)
      .populate('_author');
  })
  .then((r) => {
    d.ds = r
    res.send({ success: true, d: d });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.add = (req, res) => {
  const form = req.body;

  if (form._target === undefined) res.send({ success: false, msg: 'params err _target' });
  if (form._author === undefined) res.send({ success: false, msg: 'params err _author' });
  if (form.content === undefined) res.send({ success: false, msg: 'params err content' });

  const target = { _id: form._target };
  let cmt_id = '';

  Deck.findOne(target)
  .then((r) => {
    if (!r) throw new Error('_target not exists');
    const cmt = new Comment(form);
    return cmt.save();
  })
  .then((r) => {
    cmt_id = r._id;
    console.log(cmt_id);
    return Deck.findOneAndUpdate(target, { $push: { cmt_ids: cmt_id } });
  })
  .then(() => {
    res.send({ success: true, cmt_id: cmt_id });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.mod = (req, res) => {
  const set = req.body;

  if (set._id === undefined) res.send({ success: false, msg: 'params err _id' });

  const f = { _id: set._id };
  const s = { $set: set };
  Comment.findOneAndUpdate(f, s)
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  })
}

exports.del = (req, res) => {
  const { _id } = req.query;

  if (_id === undefined) res.send({ success: false, msg: 'params err _id' });

  const f = { _id };
  let _target = undefined;

  Comment.findOne(f)
  .then((r) => {
    if (!r) throw new Error('Comment not exists');
    _target = r._target;
    return Comment.remove(f);
  })
  .then(() => {
    return Deck.findOneAndUpdate({ _id: _target }, { $pull: { cmt_ids: _id } });
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}
