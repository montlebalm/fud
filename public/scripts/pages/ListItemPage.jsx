'use strict';

var _ = require('underscore');
var React = require('react');
var Routable = require('../mixins/Routable.js');
var GrocerySvc = require('../services/GrocerySvc.js');
var PageHeader = require('../components/pageHeader.jsx');
var PageContent = require('../components/pageContent.jsx');
var QuantityPicker = require('../components/QuantityPicker.jsx');

module.exports = React.createClass({
  mixins: [Routable],
  getDefaultProps: function() {
    return {
      item: {
        item: {
          name: ''
        },
        quantity: 0,
        note: ''
      },
      listId: 0
    };
  },
  getInitialState: function() {
    return {
      itemCopy: {}
    };
  },
  componentWillMount: function() {
    this.state.itemCopy = _.clone(this.props.item);
  },
  _saveItem: function() {
    var self = this;

    if (this.state.itemCopy.quantity > 0) {
      GrocerySvc.saveItem(this.props.listId, this.state.itemCopy, function(err, res) {
        if (!err) {
          self.setRoute('/');
        }
      });
    } else {
      this._removeItem();
    }
  },
  _updateQuantity: function(quantity) {
    if (quantity >= 0) {
      this.state.itemCopy.quantity = quantity;
      this.forceUpdate();
    }
  },
  _onNoteChanged: function(e) {
    this.state.itemCopy.note = e.target.value;
    this.forceUpdate();
  },
  _removeItem: function() {
    var self = this;

    GrocerySvc.removeItem(this.props.listId, this.props.item.item.id, function(err, res) {
      if (!err) {
        self.setRoute('/');
      }
    });
  },
  render: function() {
    return (
      <div>
        <PageHeader title={this.state.itemCopy.item.name}>
          <button className='btn btn-link btn-nav pull-left' onClick={this.routeHandler('/')}>Cancel</button>
          <button className='btn btn-link btn-nav pull-right' onClick={this._saveItem}>Save</button>
        </PageHeader>
        <PageContent>
          <h5 className='content-padded'>Quantity</h5>
          <QuantityPicker value={this.state.itemCopy.quantity} onUpdate={this._updateQuantity} />
          <h5 className='content-padded'>Notes</h5>
          <textarea ref='itemNotes' value={this.state.itemCopy.note} onChange={this._onNoteChanged}></textarea>
          <button className='btn btn-negative btn-block' onClick={this._removeItem}>Remove</button>
        </PageContent>
      </div>
    );
  }
});

