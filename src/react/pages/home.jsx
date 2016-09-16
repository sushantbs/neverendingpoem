import React, {Component} from 'react';
import Verses from '../components/verse.jsx';
import AddVerse from '../components/add-verse.jsx';

export default class Homepage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className='tab-content-section'>
          <Verses ruleCount={2} pageNum={-1} addVerse={true} pageSize={10} pagination='simple' />
        </div>
      </div>);
  }
}
