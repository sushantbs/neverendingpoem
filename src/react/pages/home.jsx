import React, {Component} from 'react';
import Header from '../components/header.jsx';

export default class Homepage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Header selected={this.props.route.tab} />
        <div className='tab-content-section'>This is the home page</div>
      </div>);
  }
}
