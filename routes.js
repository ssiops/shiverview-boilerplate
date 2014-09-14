var crypto = require('crypto');

module.exports = [
  {
    url: '/get',
    method: 'get',
    handler: function (req, res, srv) {
      srv.db.find({}, 'boilerplate', {})
      .then(function (docs) {
        res.send(docs);
      }, function (err) {
        res.send(err);
      });
    }
  },
  {
    url: '/add',
    method: 'get',
    handler: function (req, res, srv) {
      var sha1 = crypto.createHash('sha1');
      sha1.update(new Date().toString(), 'utf-8');
      srv.db.insert({content: sha1.digest('base64')}, 'boilerplate', {})
      .finally(function () {
        res.status(201).send();
      });
    }
  },
  {
    url: '/drop',
    method: 'get',
    handler: function (req, res, srv) {
      srv.db.remove({}, 'boilerplate', {})
      .finally(function () {
        res.status(201).send();
      });
    }
  }
]
