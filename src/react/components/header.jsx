import React, {Component} from 'react';
import {Tabs, Tab, Dropdown, Glyphicon, MenuItem} from 'react-bootstrap';
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
        <div className='dropdown-container'>
          <Dropdown bsSize='large' id="dropdown-custom-1" onSelect={this.onTabClick}>
            <Dropdown.Toggle noCaret={true} >
              <Glyphicon glyph="menu-hamburger" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <MenuItem eventKey='home'>Home</MenuItem>
              <MenuItem eventKey='rules'>Rules</MenuItem>
              <MenuItem eventKey='poem'>The Poem</MenuItem>
              <MenuItem eventKey='about'>About</MenuItem>
              <MenuItem eventKey='contact'>Contact</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
      </div>
    </div>)
  }
}
