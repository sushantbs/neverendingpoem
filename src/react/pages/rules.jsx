import React, {Component} from 'react';
import Header from '../components/header.jsx';

export default class Rulespage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Header selected={this.props.route.tab} />
        <h3 className='centered'>Rules</h3>
        <div className='tab-content-section'>
          <p>Rule #1: Use any word from the previous line, so long as it is not something lame like an article, preposition, pronoun and other such. You can use derivatives too. Refer to the first page of the poem for examples.</p>
          <p>Rule #2: The rhyme scheme is aa, bb, cc, dd, and so on. So you submit two lines with a rhyme scheme of your choice. Again, see the poem's first page for examples. Also, If you find a hanging line without a rhyme, feel free to complete that couplet too.</p>
          <p>Rule #3: Propaganda of any sort will not be tolerated. If you must rant, do it elsewhere. Same goes for leaving any links to anything. This is not a space to promote yourself in any way.</p>
          <p>Rule #4: The poem was started in English, so stick to that language.</p>
          <p>Rule #5: There is a limit of 80 characters in any one line.</p>
          <p>Rule #6: Any contributions not in line with the rules will be deleted.</p>
        </div>
      </div>);
  }
}
