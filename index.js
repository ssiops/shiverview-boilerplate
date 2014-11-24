var crypto = require('crypto');

function App() {
  var manifest = require('./manifest.json');
  for (var prop in manifest) {
    this[prop] = manifest[prop];
  }
  this.routes = require('./routes.js');
  this.pkg = require('./package.json');
  this.bower = require('./bower.json');
  this.tests = require('./tests/index.js');
  return this;
}

var app = new App();

App.prototype.init = function (srv, callback) {
  var self = this;
  if (process.env.verbose) console.log('App init: ' + self.pkg.name);
  var sha1 = crypto.createHash('sha1');
  sha1.update(new Date().toString(), 'utf-8');
  var p = srv.db.insert({content: sha1.digest('base64')}, 'boilerplate', {})
  .then(function () {
    if (process.env.verbose) console.log('App init complete: ' + self.pkg.name);
    return callback();
  });
};

module.exports = app;
