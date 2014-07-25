'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      mainControls: [],
      subControls: [],
      section: '',
      title: ''
    };
  },
  shouldComponentUpdate: function() {
    return false;
  },
  render: function() {
    return (
      <header className='bar bar-nav'>
        {this.props.children}
        <h1 className='title'>{this.props.title}</h1>
      </header>
    );
  }
});

