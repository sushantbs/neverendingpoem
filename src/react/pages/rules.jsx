import React, {Component} from 'react';
import Header from '../components/header.jsx';
import RuleBlock from '../components/rule-block.jsx';

export default class Rulespage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3 className='centered'>Rules</h3>
        <div className='tab-content-section'>
					<RuleBlock showAll={false} />
        </div>
      </div>);
  }
}
