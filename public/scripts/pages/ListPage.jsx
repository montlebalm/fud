'use strict';

var React = require('react');
var Routable = require('../mixins/Routable.js');
var GrocerySvc = require('../services/GrocerySvc.js');
var PageHeader = require('../components/pageHeader.jsx');
var PageContent = require('../components/pageContent.jsx');
var ItemList = require('../components/itemList.jsx');

module.exports = React.createClass({
  mixins: [Routable],
  getDefaultProps: function() {
    return {
      listId: 0
    };
  },
  getInitialState: function() {
    return {
      filter: '',
      list: {}
    };
  },
  componentDidMount: function() {
    var self = this;

    GrocerySvc.getList(this.props.listId, function(err, list) {
      self.setState({
        list: list
      });
    });
  },
  _updateFilter: function(e) {
    this.setState({
      filter: e.target.value.toLowerCase()
    });
  },
  _selectItem: function(item) {
    var url = '/list/' + this.props.listId + '/item/' + item.item.id;
    this.setRoute(url);
  },
  _toggleItem: function(item) {
    item.completed = !item.completed;
    this.forceUpdate();
  },
  _removeItem: function(item) {
    for (var i = 0, len = this.state.list.items.length; i < len; i++) {
      if (this.state.list.items[i].item.id == item.item.id) {
        this.state.list.items.splice(i, 1);
        this.forceUpdate();
        break;
      }
    }
  },
  render: function() {
    var self = this;
    var filteredItems;

    if (this.state.list.items) {
      filteredItems = this.state.list.items.filter(function(item) {
        return item.item.name.toLowerCase().indexOf(self.state.filter) !== -1;
      });
    }

    return (
      <div>
        <PageHeader title={this.state.list.name}>
          <a className='icon icon-plus pull-right' href='#modal-edit-item'></a>
        </PageHeader>
        <div className='bar bar-standard bar-header-secondary'>
          <input type='search' placeholder='Filter items' onChange={this._updateFilter} />
        </div>
        <PageContent section='list'>
          <div className='content-inner'>
            <ItemList items={filteredItems}
              onToggleItem={this._toggleItem}
              onRemoveItem={this._removeItem}
              onSelectItem={this._selectItem} />
          </div>
        </PageContent>
      </div>
    );
  }
});

