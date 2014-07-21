'use strict';

require('ratchet');
var $ = require('jquery');
var React = require('react');
var RouterSvc = require('./services/RouterSvc.js');
var ListPage = require('./pages/ListPage.jsx');
var ListItemPage = require('./pages/ListItemPage.jsx');

$(function() {
  var attachFastClick = require('fastclick');
  attachFastClick(document.body);

  RouterSvc.listen({
    '/': function() {
      React.renderComponent(
        new ListPage({
          listId: 1
        }),
        document.body
      );
    },
    '/list/:listid/item/:itemId': function(listId, itemId) {
      React.renderComponent(
        new ListItemPage({
          listId: listId,
          itemId: itemId
        }),
        document.body
      );
    }
  });
});

