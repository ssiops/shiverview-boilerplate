var q = require('q');
var request = require('request');

module.exports = {
  '/get': function (it) {
    var d = q.defer();
    it('should retrieve a list of strings', function () {
      request.get('http://localhost:' + process.env.port || 80, function (err, res, body) {
        if (res.statusCode !== 200)
          return d.reject('got status code ' + res.statusCode);
        else {
          obj = JSON.parse(body.toString());
          if (!obj instanceof Array)
            return d.reject('got non-array ' + body);
          else
            return d.resolve();
        }
      });
    });
    return d.promise;
  },
  '/add': function (it) {
    var d = q.defer();
    it('should add a string to database and respond 201', function () {
      request.get('http://localhost:' + process.env.port || 80, function (err, res, body) {
        if (res.statusCode !== 201)
          d.reject('got status code ' + res.statusCode);
        else
          d.resolve();
      });
    });
    return d.promise;
  },
  '/drop': function (it) {
    var d = q.defer();
    it('should drop all strings in database and respond 201', function (Db) {
      request.get('http://localhost:' + process.env.port || 80, function (err, res, body) {
        if (res.statusCode !== 201)
          return d.reject('got status code ' + res.statusCode);
        else {
          var db = new Db('shiverview');
          db.find({}, 'boilerplate', {})
          .then(function (data) {
            if (data.length > 0)
              d.reject('strings not removed from database');
            else
              d.resolve();
          }, function (err) {
            d.reject(err);
          });
        }
      });
    });
    return d.promise;
  }
};