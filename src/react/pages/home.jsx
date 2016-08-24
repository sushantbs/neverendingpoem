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
          <Verses pageNum={-1} addVerse={true} pageSize={2} pagination='simple' />
        </div>
      </div>);
  }
}
