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

  // Pull a dump of data
  GrocerySvc.getLists(1, function(err, lists) {
    // Hook up the routes
    RouterSvc.listen({
      '/': function() {
        var page = new ListPage({
          list: lists.runningList
        });
        React.renderComponent(page, document.body);
      },
      '/list/:listid/item/:itemId': function(listId, itemId) {
        var item;

        for (var i = 0, len = lists.runningList.items.length; i < len; i++) {
          if (lists.runningList.items[i].item.id == itemId) {
            item = lists.runningList.items[i];
            break;
          }
        }

        var page = new ListItemPage({
          listId: listId,
          item: item
        });
        React.renderComponent(page, document.body);
      }
    });
  });

});

