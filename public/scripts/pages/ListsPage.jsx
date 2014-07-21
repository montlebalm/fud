'use strict';

var React = require('react');
var GrocerySvc = require('../services/GrocerySvc.js');
var PageHeader = require('../components/pageHeader.jsx');
var PageContent = require('../components/pageContent.jsx');
var NewListModal = require('../modals/NewListModal.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lists: [],
      running: {}
    };
  },
  componentDidMount: function() {
    var self = this;

    GrocerySvc.getLists(function(err, res) {
      self.setState({
        running: res.runningList,
        lists: res.lists
      });
    });
  },
  addList: function(list) {
    console.log('new list', list);
  },
  _renderListItem: function(list) {
    return (
      <li key={list.id} className='table-view-cell'>
        <a href={'#/list/' + list.id} className='navigate-right'>{list.name}</a>
      </li>
    );
  },
  _renderListHeader: function(title) {
    return (
      <li key={title} className='table-view-cell table-view-divider'>{title}</li>
    );
  },
  render: function() {
    // <a className='icon icon-plus pull-right' href='#modal-new-list'></a>

    return (
      <div>
        <PageHeader title='Gross lists'>
        </PageHeader>
        <PageContent>
          <div id='content-inner'>
            <ul className='table-view'>
              {this._renderListItem(this.state.running)}
              {/*this._renderListHeader('Saved lists')*/}
              {/*this.state.lists.map(this._renderListItem)*/}
            </ul>
          </div>
        </PageContent>
        <NewListModal addList={this.addList} contentId='content-inner' />
      </div>
    );
  }
});

