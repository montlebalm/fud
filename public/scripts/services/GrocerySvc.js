'use strict';

var FIXTURES = require('../FIXTURES.js');

function getListById(listId) {
  if (listId == FIXTURES.runningList.id) {
    return FIXTURES.runningList;
  }

  for (var i = 0; i < FIXTURES.lists.length; i++) {
    if (FIXTURES.lists[i].id == listId) {
      return FIXTURES.lists[i];
    }
  }
}

function getItemById(listId, itemId) {
  var list = getListById(listId);

  for (var i = 0, len = list.items.length; i < len; i++) {
    if (list.items[i].item.id == itemId) {
      return list.items[i];
    }
  }
}

module.exports = {
  getLists: function(callback) {
    callback(null, {
      runningList: FIXTURES.runningList,
      lists: FIXTURES.lists
    });
  },
  getList: function(listId, callback) {
    callback(null, getListById(listId));
  },
  getListItem: function(listId, itemId, callback) {
    callback(null, getItemById(listId, itemId));
  },
  saveItem: function(listId, item, callback) {
    var list = getListById(listId);

    for (var i = 0, len = list.items.length; i < len; i++) {
      if (list.items[i].item.id == item.item.id) {
        list.items[i] = item;
        break;
      }
    }

    callback(null);
  },
  removeItem: function(listId, itemId, callback) {
    var list = getListById(listId);

    for (var i = 0, len = list.items.length; i < len; i++) {
      if (list.items[i].item.id == itemId) {
        list.items.splice(i, 1);
        break;
      }
    }

    callback(null);
  }
};

