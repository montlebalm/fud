'use strict';

var $ = require('jquery');
var React = require('react');
var Hammer = require('hammerjs');

var SWIPE_DISTANCT_LIMIT = 100;
var SWIPE_ACTIVATE_DISTANCE = 75;
var SWIPE_ANIMATION_SPEED = 75;
var COLLAPSE_ANIMATION_SPEED = 50;

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      item: {},
      onToggle: function() {},
      onRemove: function() {},
      onSelect: function() {}
    };
  },
  componentDidMount: function() {
    this._attachSwipe();
  },
  _attachSwipe: function() {
    var self = this;
    var options = {
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 10
    };

    $(this.getDOMNode()).find('.table-view-cell').each(function(i, el) {
      new Hammer(el, options)
        .on('pan', self._panItem.bind(self, el))
        .on('panend', self._panItemReset.bind(self, el));
    });
  },
  _panItem: function(el, e) {
    if (Math.abs(e.deltaX) < SWIPE_DISTANCT_LIMIT) {
      el.style.left = e.deltaX + 'px';
    }
  },
  _panItemReset: function(el, e) {
    var self = this;

    // Check if the user moved the item enough
    if (Math.abs(e.deltaX) >= SWIPE_ACTIVATE_DISTANCE) {
      var $overlay = $(el).closest('.item-overlay');
      var itemId = $overlay.attr('data-id');

      $overlay.animate({ height: 0 }, {
        duration: COLLAPSE_ANIMATION_SPEED,
        done: function() {
          if (e.deltaX >= SWIPE_ACTIVATE_DISTANCE) {
            self.props.onToggle(self.props.item);
          } else {
            self.props.onRemove(self.props.item);
          }
        }
      });
    } else {
      $(el).animate({ left: 0 }, {
        duration: SWIPE_ANIMATION_SPEED
      });
    }
  },
  _selectItem: function() {
    this.props.onSelect(this.props.item);
  },
  _renderQuantity: function(quantity) {
    if (quantity && quantity > 1) {
      return (<span className='item-quantity'>({quantity})</span>);
    }
  },
  _renderNote: function(note) {
    if (note) {
      return (<p>{note}</p>);
    }
  },
  _renderToggleButton: function() {
    if (this.props.item.completed) {
      return (
        <button className='btn btn-block action-incomplete'>
          <span className='icon icon-refresh'></span>
        </button>
      );
    } else {
      return (
        <button className='btn btn-block btn-positive action-complete'>
          <span className='icon icon-check'></span>
        </button>
      );
    }
  },
  _renderRemoveButton: function() {
    return (
      <button className='btn btn-block btn-negative action-remove'>
        <span className='icon icon-close'></span>
      </button>
    );
  },
  render: function() {
    return (
      <li className='item-overlay' data-id={this.props.item.item.id} data-completed={this.props.item.completed}>
        <div className='table-view-cell' >
          <a className='navigate-right' onClick={this._selectItem}>
            {this.props.item.item.name}
            {this._renderQuantity(this.props.item.quantity)}
            {this._renderNote(this.props.item.note)}
          </a>
        </div>
        {this._renderToggleButton()}
        {this._renderRemoveButton()}
      </li>
    );
  }
});

