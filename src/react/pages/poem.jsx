import React, {Component} from 'react';
import Header from '../components/header.jsx';
import Verses from '../components/verse.jsx';
import AddVerse from '../components/add-verse.jsx';

export default class Poempage extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
  
  }

  render () {
    return (
      <div>
				<h3 className='centered'>The Poem</h3>
        <div className='tab-content-section'>
          <Verses scrollUp={'...'} pagination='infinite' pageNum={0} pageSize={20} addVerse={false} />
        </div>
      </div>);
  }
}
