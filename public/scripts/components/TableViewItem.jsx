'use strict';

var $ = require('jquery');
var React = require('react');
var Hammer = require('hammerjs');
var TweenLite = require('tweenlite');

var SWIPE_DISTANCT_LIMIT = 100;
var SWIPE_ACTIVATE_DISTANCE = 75;
var SWIPE_ANIMATION_SPEED = 75;
var COLLAPSE_ANIMATION_SPEED = 50;

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      item: {
        completed: false,
        id: -1,
        note: '',
        text: '',
        quantity: 1
      },
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
      //el.style.left = e.deltaX + 'px';
      el.style.webkitTransform = 'translateX(' + e.deltaX + 'px)';
    }
  },
  _panItemReset: function(el, e) {
    var self = this;

    // Check if the user moved the item enough
    if (Math.abs(e.deltaX) >= SWIPE_ACTIVATE_DISTANCE) {
      var $container = $(el).closest('li.item-overlay');

      if (e.deltaX >= SWIPE_ACTIVATE_DISTANCE) {
        $container.addClass('reveal-positive anim-slide-left-collapse');

        setTimeout(function() {
          self.props.onToggle(self.props.item.id);
        }, 500);
      } else {
        $container.addClass('reveal-negative anim-slide-right-collapse');
        $container.on('webkitTransitionEnd', function() {
          //self.props.onRemove(self.props.item.id);
        });
      }
    } else {
      el.style.webkitTransform = 'translateX(0px)';
    }
  },
  _selectItem: function() {
    this.props.onSelect(this.props.item.id);
  },
  _renderQuantity: function(quantity) {
    if (quantity && quantity > 1) {
      return (<span className='item-quantity'>({quantity})</span>);
    }
  },
  _renderToggleButton: function() {
    if (this.props.item.completed) {
      return (
        <button className='btn btn-neutral action-incomplete'>
          <span className='icon icon-refresh'></span>
        </button>
      );
    } else {
      return (
        <button className='btn btn-positive action-complete'>
          <span className='icon icon-check'></span>
        </button>
      );
    }
  },
  _renderRemoveButton: function() {
    return (
      <button className='btn btn-negative action-remove'>
        <span className='icon icon-close'></span>
      </button>
    );
  },
  render: function() {
    return (
      <li className='item-overlay' data-id={this.props.item.id} data-completed={this.props.item.completed}>
        <div className='table-view-cell' >
          <a className='navigate-right' onClick={this._selectItem}>
            {this.props.item.text}
            {this._renderQuantity(this.props.item.quantity)}
            <p className='item-note'>{this.props.item.note}</p>
          </a>
        </div>
        {this._renderToggleButton()}
        {this._renderRemoveButton()}
      </li>
    );
  }
});

