import React, {Component} from 'react';
import Header from '../components/header.jsx';

export default class Rulespage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3 className='centered'>Rules</h3>
        <div className='tab-content-section'>
					<p>Rule #1: In your two lines, use any word from the previous two lines, so long as it is not something lame like an article, preposition, pronoun and other such. You can use derivatives too. Refer to the first page of the poem for examples.</p>
					<p>Rule #2: The rhyme scheme is aa, bb, cc, dd, and so on. So you submit two lines with a rhyme scheme of your choice. Again, see the poem's first page for examples.</p>
					<p>Rule #3: This is not for promoting yourself or your propaganda, and so, if you must rant, do it elsewhere.</p>
					<p>Rule #4: The poem was started in English, so stick to that language.</p>
					<p>Rule #5: There is a limit of 80 characters in any one line.</p>
					<p>Rule #6: Any contributions not in line with the rules will be deleted.</p>
        </div>
      </div>);
  }
}
