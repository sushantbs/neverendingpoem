import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';

require('../less/main.less');

export default class Homepage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='master-container'>
        <div className='full-width header'>
          <img className='logo' src='/imgs/TempLogo.png' />
          <div className='heading-text'>
            <h2> NEVER ENDING POEM </h2>
            <h4> One man's dream, populated by many </h4>
          </div>
        </div>
        <div className="app-section">
          {this.props.children}
        </div>
        <div className='full-width footer'>
        </div>
      </div>
    );
  }
}
