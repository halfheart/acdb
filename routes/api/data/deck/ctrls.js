const Deck = require('../../../../models/decks');
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

  Deck.count(query)
  .then((c) => {
    d.cnt = c;
    let s = {};
    s[order] = sort;
    return Deck.find(query)
      .skip(skip)
      .limit(limit)
      .sort(s)
      .populate('investigator_id');
  })
  .then((r) => {
    d.ds = r
    res.send({ success: true, d: d });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.read = (req, res) => {
  const query = { _id: req.params._id };

  Deck.findOneAndUpdate(query, { $inc: { view_cnt: 1 } })
  .then((r) => {
    if (!r) throw new Error('deck not exists');
    return Deck.findOne(query)
      .populate('investigator_id')
      .populate({
        path: 'cards.card_id',
        populate: {
          path: 'pack_id',
          select: 'name'
        }
      })
  })
  .then((r) => {
    res.send({ success: true, deck: r });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  })
}

exports.deck = (req, res) => {
  const query = { _id: req.params._id };

  Deck.findOne(query)
  .populate('investigator_id')
  .populate({
    path: 'cards.card_id',
    populate: {
      path: 'pack_id',
      select: 'name'
    }
  })
  .then((r) => {
    if (!r) throw new Error('deck not exists');
    res.send({ success: true, deck: r });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  })
}

exports.add = (req, res) => {
  const form = req.body;

  console.log(JSON.stringify(form, undefined, 2));

  const deck = new Deck(form);

  deck.save()
  .then((r) => {
    res.send({ success: true, _id: r._id });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.mod = (req, res) => {
  const set = req.body;

  if(!set._id) res.send({ success: false, msg: '_id not exists' });

  const f = { _id: set._id };
  const s = { $set: set };

  Deck.findOneAndUpdate(f, s)
  .then((r) => {
    res.send({ success: true, _id: r._id });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.del = (req, res) => {
  const _id = req.query;

  if (_id === undefined) res.send({ success: false, msg: 'params err _id' });

  Deck.findOne({ _id: _id })
  .then((r) => {
    if (!r) throw new Error('Deck not exists');
    return Deck.remove({ _id: _id });
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}
