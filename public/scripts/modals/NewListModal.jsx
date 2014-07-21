'use strict';

var React = require('react');
var PageHeader = require('../components/pageHeader.jsx');
var PageContent = require('../components/pageContent.jsx');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      addList: function() {}
    };
  },
  getInitialState: function() {
    return {
      stores: [{
        id: 1,
        name: 'King Soopers'
      }]
    };
  },
  _handleSubmit: function(e) {
    e.preventDefault();

    var listName = this.refs.listName.state.value;
    var listNotes = this.refs.listNotes.state.value;
    var listStore = this.refs.listStore.state.value;

    if (!listName) {
      alert('List name is required');
    } else {
      this.props.addList({
        name: listName,
        notes: listNotes,
        store: listStore
      });
    }
  },
  render: function() {
    var storeOptions = this.state.stores.map(function(store) {
      return (<option key={store.id} value={store.id}>{store.name}</option>);
    });

    return (
      <div id='modal-new-list' className='modal'>
        <PageHeader title='New list'>
          <a className='btn btn-link btn-nav pull-left' href='#modal-new-list'>Cancel</a>
          <a className='btn btn-link btn-nav pull-right' onClick={this._handleSubmit}>Add</a>
        </PageHeader>
        <PageContent>
          <form onSubmit={this._handleSubmit}>
            <div className='input-group'>
              <input type='text' placeholder='List name' ref='listName' />
              <textarea placeholder='Notes' ref='listNotes'></textarea>
            </div>
            <h5 className='content-padded'>Store</h5>
            <select ref='listStore'>
              <option>Select store</option>
              {storeOptions}
            </select>
          </form>
        </PageContent>
      </div>
    );
  }
});

