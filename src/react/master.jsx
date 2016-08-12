import React, {Component} from 'react';

require('../less/main.less');

export default class Homepage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="app-section">
        {this.props.children}
      </div>
    );
  }
}
