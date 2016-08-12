import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';

require('../less/main.less');

export default class Homepage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="app-section">
        <div className="fa fa-2x fa-user"></div>
        {this.props.children}
      </div>
    );
  }
}
