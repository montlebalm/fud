'use strict';

require('ratchet');
var $ = require('jquery');
var React = require('react');
var RouterSvc = require('./services/RouterSvc.js');
var ListPage = require('./pages/ListPage.jsx');
var ListItemPage = require('./pages/ListItemPage.jsx');
var GrocerySvc = require('./services/GrocerySvc.js');

$(function() {
  // Use FastClick so the app will feel snappier
  var attachFastClick = require('fastclick');
  attachFastClick(document.body);

  // Hook up the routes
  RouterSvc.listen({
    '/': function() {
      var page = new ListPage({
        listId: 1
      });
      React.renderComponent(page, document.body);
    },
    '/list/:listid/item/:itemId': function(listId, itemId) {
      var page = new ListItemPage({
        listId: listId,
        itemId: itemId
      });
      React.renderComponent(page, document.body);
    }
  });

});

