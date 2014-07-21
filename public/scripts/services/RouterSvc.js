'use strict';

var Director = require('director');

var config = {
  html5history: true
};

module.exports = {
  _router: null,
  listen: function(routes) {
    this._router = Director.Router(routes).configure(config);
    this._router.init();
  },
  setRoute: function(route) {
    this._router.setRoute(route);
  }
};

