var crypto = require('crypto');
var LINKS = '<p><a href="/boilerplate/add">Add</a> <a href="/boilerplate/drop">Drop</a></p>';

module.exports = [
  {
    url: '/',
    method: 'get',
    handler: function (req, res, srv) {
      srv.db.find({}, 'boilerplate', {})
      .then(function (docs) {
        if (docs.length >= 0) {
          var html = '<ul>';
          for (var i = 0; i < docs.length; i++)
            html += '<li>' + docs[i].content + '</li>';
          html += '</ul>';
          res.send(html + LINKS);
        } else
          res.send('<p>Nothing to see. Move along.</p>' + LINKS);
      }, function (err) {
        res.send('<p>' + err + '</p>' + LINK);S
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
        res.redirect('/boilerplate');
      });
    }
  },
  {
    url: '/drop',
    method: 'get',
    handler: function (req, res, srv) {
      srv.db.remove({}, 'boilerplate', {})
      .finally(function () {
        res.redirect('/boilerplate');
      });
    }
  }
]
