'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      value: 0,
      onUpdate: function() {}
    };
  },
  _updateValue: function(modifier) {
    this.props.onUpdate(this.props.value + modifier);
  },
  render: function() {
    return (
      <div className='comp-quantity-picker clearfix'>
        <button className='modifier decrease pull-left' onClick={this._updateValue.bind(this, -1)}>–</button>
        <div className='quantity'>
          <span>{this.props.value}</span>
        </div>
        <button className='modifier increase pull-right' onClick={this._updateValue.bind(this, 1)}>+</button>
      </div>
    );
  }
});

