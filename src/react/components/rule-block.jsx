import React, {Component} from 'react';
import request from 'superagent';
import {rules} from '../../../config/config.js';
import {Link} from 'react-router';
import _ from 'lodash';

export default class RuleBlock extends Component {

  constructor (props) {
    super(props);
  }

  render () {

		let {ruleCount, showMore} = this.props;

		if (!ruleCount) {
			ruleCount = rules.length;
		}

    return (
      <div className='rule-block-container'>
				{
					_.map(rules, (rule, index) => (index < ruleCount ? (<p key={'rule-' + index}>{rule}</p>) : null))
				}
				{showMore ? (<Link to='/rules'>{rules.length - ruleCount} more rules...</Link>) : null}
      </div>);
  }
}
