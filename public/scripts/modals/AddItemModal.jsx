'use strict';

var _ = require('underscore');
var React = require('react');
var async = require('async');
var GrocerySvc = require('../services/GrocerySvc.js');
var PageHeader = require('../components/pageHeader.jsx');
var PageContent = require('../components/pageContent.jsx');
var TableView = require('../components/TableView.jsx');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      updateItems: function() {},
      listId: -1
    };
  },
  getInitialState: function() {
    return {
      filter: '',
      items: [],
      selectedIds: {}
    };
  },
  componentWillMount: function() {
    var self = this;

    async.parallel({
      list: function(next) {
        GrocerySvc.getList(self.props.listId, next);
      },
      all: function(next) {
        GrocerySvc.getItems(next);
      }
    }, function(err, results) {
      results.list.items.forEach(function(item) {
        self.state.selectedIds[item.id] = true;
      });

      self.setState({
        items: results.all
      });
    });
  },
  _selectItem: function(item, e) {
    e.preventDefault();

    if (!this.state.selectedIds[item.id]) {
      this.state.selectedIds[item.id] = true;
    } else {
      delete this.state.selectedIds[item.id];
    }

    this.forceUpdate();
  },
  _sortItems: function(a, b) {
    if (a.name > b.name) {
      return 1;
    } else if (b.name > a.name) {
      return -1;
    }

    return 0;
  },
  _addItems: function(e) {
    e.preventDefault();
    debugger;
    var ids = Object.keys(this.state.selectedIds).map(Number);
    this.props.updateItems(ids);
  },
  render: function() {
    var self = this;

    var filteredItems = this.state.items.filter(function(item) {
      return item.name.toLowerCase().indexOf(self.state.filter) !== -1;
    });
    filteredItems.sort(this._sortItems);

    var items = filteredItems.map(function(item) {
      var mark;

      if (self.state.selectedIds[item.id]) {
        mark = (<span className='icon icon-check pull-right'></span>);
      }

      return (
        <li key={item.id} className='table-view-cell' onClick={self._selectItem.bind(self, item)}>
          {item.name}
          {mark}
        </li>
      );
    });

    return (
      <div id='modal-add-item' className='modal'>
        <PageHeader title='Add items'>
          <a className='btn btn-link btn-nav pull-left' href='#modal-add-item'>Back</a>
          <a className='btn btn-link btn-nav pull-right' onClick={this._addItems}>Save</a>
        </PageHeader>
        <div className='bar bar-standard bar-header-secondary'>
          <input type='search' placeholder='Find items' onChange={this._updateFilter} />
        </div>
        <PageContent>
          <div className='content-inner'>
            <ul className='table-view'>{items}</ul>
          </div>
        </PageContent>
      </div>
    );
  }
});

