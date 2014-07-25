'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      section: ''
    };
  },
  shouldComponentUpdate: function() {
    return false;
  },
  render: function() {
    return (
      <div className='content' data-section={this.props.section}>
        {this.props.children}
      </div>
    );
  }
});

