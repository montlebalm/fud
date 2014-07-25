'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      value: 0,
      onUpdate: function() {}
    };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  },
  _updateValue: function(modifier) {
    this.props.onUpdate(this.props.value + modifier);
  },
  render: function() {
    return (
      <div className='comp-quantity-picker clearfix'>
        <a className='modifier decrease pull-left' onClick={this._updateValue.bind(this, -1)}>–</a>
        <div className='quantity'>{this.props.value}</div>
        <a className='modifier increase pull-right' onClick={this._updateValue.bind(this, 1)}>+</a>
      </div>
    );
  }
});

