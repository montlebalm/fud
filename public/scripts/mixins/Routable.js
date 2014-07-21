'use strict';

var RouterSvc = require('../services/RouterSvc.js');

module.exports = {
  setRoute: function(route) {
    RouterSvc.setRoute(route);
  },
  routeHandler: function(route) {
    var self = this;

    return function() {
      self.setRoute(route);
    };
  }
};

