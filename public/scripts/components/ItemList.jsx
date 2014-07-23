'use strict';

var React = require('react');
var ItemListItem = require('../components/ItemListItem.jsx');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      items: [],
      onToggleItem: function() {},
      onRemoveItem: function() {},
      onSelectItem: function() {}
    };
  },
  _onToggleItem: function(item) {
    this.props.onToggleItem(item);
    this.forceUpdate();
  },
  _renderSectionTitle: function(title) {
    return (<li key={title} className='table-view-cell table-view-divider'>{title}</li>);
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
        <ItemListItem key={item.item.id}
          item={item}
          onSelect={self.props.onSelectItem}
          onToggle={self._onToggleItem}
          onRemove={self.props.onRemoveItem} />
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

