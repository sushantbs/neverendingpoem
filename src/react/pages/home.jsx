import React, {Component} from 'react';
import Header from '../components/header.jsx';
import Verses from '../components/verse.jsx';
import AddVerse from '../components/add-verse.jsx';

export default class Homepage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Header selected={this.props.route.tab} />
        <div className='tab-content-section'>
          <Verses page={-1} addVerse={true} />
        </div>
      </div>);
  }
}
