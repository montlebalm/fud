'use strict';

var $ = require('jquery');
var React = require('react');
var Hammer = require('hammerjs');
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
  componentDidUpdate: function() {
    this._attachSwipe();
  },
  _attachSwipe: function() {
    var self = this;
    var options = {
      direction: Hammer.DIRECTION_HORIZONTAL
    };

    $(this.refs.list.getDOMNode()).find('.table-view-cell').each(function(i, el) {
      new Hammer(el, options)
        .on('pan', self._panItem.bind(self, el))
        .on('panend', self._panItemReset.bind(self, el));
    });
  },
  _panItem: function(el, e) {
    if (Math.abs(e.deltaX) < 75) {
      el.style.left = e.deltaX + 'px';
    }
  },
  _panItemReset: function(el, e) {
    if (e.deltaX >= 60 || e.deltaX <= -60) {
      var itemId = $(el).closest('[data-id]').attr('data-id');

      if (e.deltaX >= 60) {
        this._toggleItem(itemId);
      } else if (e.deltaX <= -60) {
        this._removeItem(itemId);
      }
    }

    el.style.left = '0px';
  },
  _updateFilter: function(e) {
    this.setState({
      filter: e.target.value.toLowerCase()
    });
  },
  _toggleItem: function(itemId) {
    for (var i = 0, len = this.state.list.items.length; i < len; i++) {
      if (this.state.list.items[i].item.id == itemId) {
        this.state.list.items[i].completed = !this.state.list.items[i].completed;
        this.forceUpdate();
        break;
      }
    }
  },
  _removeItem: function(itemId) {
    for (var i = 0, len = this.state.list.items.length; i < len; i++) {
      if (this.state.list.items[i].item.id == itemId) {
        this.state.list.items.splice(i, 1);
        this.forceUpdate();
        break;
      }
    }
  },
  _renderItems: function(items) {
    if (!items || !items.length) {
      return;
    }

    var self = this;

    return items.map(function(item) {
      var url = '/list/' + self.props.listId + '/item/' + item.item.id;
      var classes = ['item-overlay'];
      var quantity;

      if (item.completed) {
        classes.push('completed');
      }

      if (item.quantity > 1) {
        quantity = (<span className='item-quantity'>({item.quantity})</span>);
      }

      return (
        <li key={item.item.id} className={classes.join(' ')}>
          <div className='table-view-cell' data-id={item.item.id}>
            <a className='navigate-right' onClick={self.routeHandler(url)}>
              {item.item.name}
              {quantity}
              <p>{item.note}</p>
            </a>
          </div>
          <button className='btn btn-positive pull-left'>
            <span className='icon icon-check'></span>
          </button>
          <button className='btn btn-negative pull-right'>
            <span className='icon icon-close'></span>
          </button>
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
            <ul className='table-view' ref='list'>
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

