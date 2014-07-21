'use strict';

var React = require('react');
var Routable = require('../mixins/Routable.js');
var GrocerySvc = require('../services/GrocerySvc.js');
var PageHeader = require('../components/pageHeader.jsx');
var PageContent = require('../components/pageContent.jsx');

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
  _toggleItem: function(item) {
    item.completed = !item.completed;
    this.forceUpdate();
  },
  _renderItems: function(items) {
    if (!items || !items.length) {
      return;
    }

    var self = this;

    return items.map(function(item) {
      var url = '/list/' + self.props.listId + '/item/' + item.item.id;
      var classes = ['table-view-cell', 'media'];
      var quantity, note;

      if (item.completed) {
        classes.push('completed');
      }

      if (item.quantity > 1) {
        quantity = (<span className='item-quantity'>({item.quantity})</span>);
      }

      if (item.note) {
        note = (<p>{item.note}</p>);
      }

      return (
        <li key={item.item.id} className={classes.join(' ')}>
          <a href='javascript:;' className='navigate-right'>
            <input type='checkbox'
              className='media-object pull-left'
              onClick={self._toggleItem.bind(self, item)}
              defaultChecked={item.completed} />
            <div onClick={self.routeHandler(url)} className='media-body'>
              {item.item.name}
              {' '}
              {quantity}
              {note}
            </div>
          </a>
        </li>
      );
    });
  },
  render: function() {
    var self = this;
    var todoItems, completedItems, completedHeader;

    if (this.state.list.items) {
      var filteredItems = this.state.list.items.filter(function(item) {
        return item.item.name.toLowerCase().indexOf(self.state.filter) !== -1;
      });

      todoItems = filteredItems.filter(function(item) {
        return !item.completed;
      });

      completedItems = filteredItems.filter(function(item) {
        return item.completed;
      });

      if (completedItems.length) {
        completedHeader = (<li className='table-view-cell table-view-divider'>Completed items</li>);
      }
    }

    // <a className='icon icon-left-nav pull-left' href='#/'></a>

    return (
      <div>
        <PageHeader title={this.state.list.name}>
          <a className='icon icon-plus pull-right' href='#modal-edit-item'></a>
        </PageHeader>
        <div className='bar bar-standard bar-header-secondary'>
          <input type='search' placeholder='Filter items' onChange={this._updateFilter} />
        </div>
        <PageContent section='list'>
          <div id='content-inner'>
            <ul className='table-view'>
              {this._renderItems(todoItems)}
              {completedHeader}
              {this._renderItems(completedItems)}
            </ul>
          </div>
        </PageContent>
      </div>
    );
  }
});

