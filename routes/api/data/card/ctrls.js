const Card = require('../../../../models/cards');
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

  Card.count(query)
  .then((c) => {
    d.cnt = c;
    let s = {};
    s[order] = sort;
    return Card.find(query)
      .skip(skip)
      .limit(limit)
      .sort(s)
      .populate('pack_id')
      .populate({
        path: 'deckReq_ids',
        populate: {
          path: 'pack_id',
          select: 'name'
        }
      });
  })
  .then((r) => {
    d.ds = r
    res.send({ success: true, d: d });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.card = (req, res) => {
  const query = { _id: req.params._id };

  Card.findOne(query)
  .then((r) => {
    if (!r) throw new Error('card not exists');
    res.send({ success: true, card: r });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  })
}

exports.add = (req, res) => {
  const {
    name,
    faction,
    type,
    illustrator,
    pack_id,
    number,
    subname,
    img,
    isUnique,
    qty,
    isDoubleFaced,
    backName,
    backText,
    backFlavor,
    backImg,
    subtype,
    cost,
    xp,
    traits,
    slots,
    will,
    int,
    combat,
    agi,
    wild,
    health,
    sanity,
    attack,
    horror,
    enemyHP,
    text,
    flavor,
    deckSize,
    deckOptions,
    deckReq_ids
  } = req.body;

  if (name === undefined) res.send({ success: false, msg: 'params err name' });
  if (faction === undefined) res.send({ success: false, msg: 'params err faction' });
  if (type === undefined) res.send({ success: false, msg: 'params err type' });
  if (illustrator === undefined) res.send({ success: false, msg: 'params err illustrator' });
  if (pack_id === undefined) res.send({ success: false, msg: 'params err pack_id' });
  if (number === undefined) res.send({ success: false, msg: 'params err number' });

  const c = new Card({
    name,
    faction,
    type,
    illustrator,
    pack_id,
    number,
    subname,
    img,
    isUnique,
    qty,
    isDoubleFaced,
    backName,
    backText,
    backFlavor,
    backImg,
    subtype,
    cost,
    xp,
    traits,
    slots,
    will,
    int,
    combat,
    agi,
    wild,
    health,
    sanity,
    attack,
    horror,
    enemyHP,
    text,
    flavor,
    deckSize,
    deckOptions,
    deckReq_ids
  });

  c.save()
  .then(() => {
    res.send({ success: true });
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

  Card.findOneAndUpdate(f, s)
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

  Card.findOne(f)
  .then((r) => {
    if (!r) throw new Error('card not exists');
    return Card.remove(f);
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}
