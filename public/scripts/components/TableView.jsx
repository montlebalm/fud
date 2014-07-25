'use strict';

var React = require('react');
var TableViewItem = require('../components/TableViewItem.jsx');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      items: [],
      onToggleItem: function() {},
      onRemoveItems: function() {},
      onSelectItem: function() {}
    };
  },
  _onToggleItem: function(itemId) {
    this.props.onToggleItem(itemId);
    this.forceUpdate();
  },
  _clearCompleted: function() {
    var completedItemIds = this.props.items.filter(function(item) {
      return item.completed;
    }).map(function(item) {
      return item.id;
    });

    this.props.onRemoveItems(completedItemIds);
  },
  _renderSectionTitle: function(title) {
    return (
      <li key={title} className='table-view-cell table-view-divider'>
        {title}
        <a className='icon icon-close pull-right' onClick={this._clearCompleted}></a>
      </li>
    );
  },
  _renderItems: function(items, title) {
    if (!items || !items.length) {
      return;
    }

    var self = this;
    var output = [];

    if (title) {
      output.push(this._renderSectionTitle(title));
    }

    var renderedItems = items.map(function(item) {
      return (
        <TableViewItem key={item.id}
          item={item}
          onSelect={self.props.onSelectItem}
          onToggle={self._onToggleItem}
          onRemove={self.props.onRemoveItems} />
      );
    });

    return output.concat(renderedItems);
  },
  render: function() {
    var todoItems = this.props.items.filter(function(item) {
      return !item.completed;
    });

    var completedItems = this.props.items.filter(function(item) {
      return item.completed;
    });

    return (
      <ul className='comp-item-list table-view'>
        {this._renderItems(todoItems)}
        {this._renderItems(completedItems, 'Completed')}
      </ul>
    );
  }
});

