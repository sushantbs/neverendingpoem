import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Dropdown, Glyphicon, MenuItem} from 'react-bootstrap';
import Footer from './components/footer.jsx';
import Header from './components/header.jsx';

require('../less/main.less');

export default class Homepage extends Component {

  constructor (props) {
    super(props);
  }

  onMenuItemClick (eventKey) {
    browserHistory.push('/' + eventKey);
  }

  render () {
    return (
      <div className='master-container'>
        <div className='full-width header'>
          <div className='dropdown-container'>
            <Dropdown bsSize='large' id="dropdown-custom-1" onSelect={this.onMenuItemClick}>
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
          <img className='logo' src='/imgs/TempLogo.png' />
          <div className='heading-text'>
            <h2> NEVER ENDING POEM </h2>
            <h4> One man's dream, populated by many </h4>
          </div>
					<Header selected={this.props.routes && this.props.routes.length && this.props.routes[this.props.routes.length - 1].tab} />
        </div>
        <div className="app-section">
          {this.props.children}
        </div>
        <div className='full-width footer'>
					<Footer />
        </div>
      </div>
    );
  }
}
