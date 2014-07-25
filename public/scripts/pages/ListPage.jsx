'use strict';

var React = require('react');
var Routable = require('../mixins/Routable.js');
var PageHeader = require('../components/pageHeader.jsx');
var PageContent = require('../components/pageContent.jsx');
var TableView = require('../components/TableView.jsx');

module.exports = React.createClass({
  mixins: [Routable],
  getDefaultProps: function() {
    return {
      list: {
        items: []
      }
    };
  },
  getInitialState: function() {
    return {
      filter: ''
    };
  },
  _updateFilter: function(e) {
    this.setState({
      filter: e.target.value.toLowerCase()
    });
  },
  _selectItem: function(item) {
    var url = '/list/' + this.props.list.id + '/item/' + item.id;
    this.setRoute(url);
  },
  _toggleItem: function(itemId) {
    this.props.list.items.forEach(function(item) {
      if (item.item.id == itemId) {
        item.completed = !item.completed;
        return false;
      }
    });

    this.forceUpdate();
  },
  _removeItems: function(itemIds) {
    itemIds = [].concat(itemIds);
    var self = this;

    itemIds.forEach(function(id) {
      for (var i = 0, len = self.props.list.items.length; i < len; i++) {
        if (self.props.list.items[i].item.id == id) {
          self.props.list.items.splice(i, 1);
          break;
        }
      }
    });

    this.forceUpdate();
  },
  render: function() {
    var self = this;

    var filteredItems = this.props.list.items.filter(function(item) {
      return item.item.name.toLowerCase().indexOf(self.state.filter) !== -1;
    }).map(function(item) {
      return {
        completed: item.completed,
        id: item.item.id,
        note: item.note,
        text: item.item.name,
        quantity: item.quantity
      };
    });

    return (
      <div>
        <PageHeader title={this.props.list.name}>
          <a className='icon icon-plus pull-right' href='#modal-edit-item'></a>
        </PageHeader>
        <div className='bar bar-standard bar-header-secondary'>
          <input type='search' placeholder='Filter items' onChange={this._updateFilter} />
        </div>
        <PageContent section='list'>
          <div className='content-inner'>
            <TableView items={filteredItems}
              onToggleItem={this._toggleItem}
              onRemoveItems={this._removeItems}
              onSelectItem={this._selectItem} />
          </div>
        </PageContent>
      </div>
    );
  }
});

