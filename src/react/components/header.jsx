import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';

export default class Header extends Component {

  constructor (props) {
    super(props);
    this.onTabClick.bind(this);
  }

  onTabClick (eventKey) {
    browserHistory.push('/' + eventKey);
  }

  render () {
    return (
      <div className='header-section'>
        <div className='tab-container'>
          <Tabs activeKey={this.props.selected} id='header-tabs' onSelect={this.onTabClick}>
            <Tab eventKey={'home'} title='Home' />
            <Tab eventKey={'rules'} title='Rules' />
            <Tab eventKey={'poem'} title='The Poem' />
            <Tab eventKey={'about'} title='About' />
            <Tab eventKey={'contact'} title='Contact' />
          </Tabs>
        </div>
      </div>);
  }
}
