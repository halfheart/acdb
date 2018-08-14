const Pack = require('../../../../models/packs');
const EJSON = require('mongodb-extjson');

exports.list = (req, res) => {
  let {
    draw,
    skip,
    limit,
    order,
    sort,
    query,
    select
  } = req.query;

  if (draw === undefined) res.send({ success: false, msg: 'params err draw' });
  if (skip === undefined) res.send({ success: false, msg: 'params err skip' });
  if (limit === undefined) res.send({ success: false, msg: 'params err limit' });
  if (order === undefined) res.send({ success: false, msg: 'params err order' });
  if (sort === undefined) res.send({ success: false, msg: 'params err sort' });
  if (query === undefined) query = {};
  if (select === undefined) select = '';

  skip = parseInt(skip);
  limit = parseInt(limit);
  sort = parseInt(sort);
  query = EJSON.parse(query);

  let d = {
    cnt: 0,
    draw: 0,
    ds: []
  };

  Pack.count(query)
  .then((c) => {
    d.cnt = c;
    let s = {};
    s[order] = sort;
    return Pack.find(query)
      .skip(skip)
      .limit(limit)
      .sort(s)
      .select(select);
  })
  .then((r) => {
    d.ds = r
    res.send({ success: true, d: d });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.pack = (req, res) => {
  const query = { _id: req.params._id };

  Pack.findOne(query)
  .then((r) => {
    if (!r) throw new Error('pack not exists');
    res.send({ success: true, pack: r });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  })
}

exports.add = (req, res) => {
  const {
    name,
    parent_id
  } = req.body;

  if (name === undefined) res.send({ success: false, msg: 'params err name' });

  const p = new Pack({
    name,
    parent_id
  });

  p.save()
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

  Pack.findOneAndUpdate(f, s)
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

  Pack.findOne(f)
  .then((r) => {
    if (!r) throw new Error('pack not exists');
    return Pack.remove(f);
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}
