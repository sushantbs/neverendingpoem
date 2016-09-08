import React, {Component} from 'react';
import request from 'superagent';
import _ from 'lodash';
import {Pagination} from 'react-bootstrap';
import AddVerse from './add-verse.jsx';
import RuleBlock from './rule-block.jsx';
import {exceptionWords} from '../../../config/config.js';

export default class VerseComponent extends Component {

	defaultProps = {
		pageNum: 0,
		pageSize: 20
	}

	state = {
    verses: [],
    loading: false,
    saving: false,
    lastId: null,
		pageNum: 0,
		pageSize: 10,
		totalPages: 0,
		totalCount: 0
  }

  constructor (props) {

    super(props);
    this.updatePoemPage = this.updatePoemPage.bind(this);
		this.validateVerse = this.validateVerse.bind(this);
  }

  fetchVerses (alwaysShowLastPage) {

    request
      .get('/api/versePage?a=' + Math.random())
			.query({pageNum: (alwaysShowLastPage ? -1 : this.state.pageNum), pageSize: this.state.pageSize})
      .set('accept', 'application/json')
      .set('content-type', 'application/json')
      .end((err, response) => {
        this.setState({
          loading: false,
          verses: response.body.verses,
					pageNum: response.body.pageNum,
					totalCount: response.body.totalCount,
					totalPages: response.body.totalPages
        });
      });

    this.setState({
      loading: true
    });
  }

	sanitizeTokens (tokenArr) {
		return _.map(tokenArr, (token) => (token.match(/^[a-zA-Z0-9-]+/)[0]));
	}

	validateVerse ({firstLine, secondLine}) {

		let lastVerse = this.state.verses[this.state.verses.length - 1];
		let existingTokens = this.sanitizeTokens(lastVerse.verse[1].split(' ').concat(lastVerse.verse[0].split(' ')));
		let newVerseTokens = this.sanitizeTokens(firstLine.split(' ').concat(secondLine.split(' ')));
		let matching = false;

		_.find(newVerseTokens, (nt) => {

			if (matching) {
				return;
			}

			if (_.indexOf(exceptionWords, nt) !== -1) {
				return;
			}

			if (_.indexOf(existingTokens, nt) !== -1) {
				matching = true;
			}

		});

		return matching;
	}

  updatePoemPage (verse) {
    this.fetchVerses(true);
  }

  componentDidMount () {
		this.state.pageNum = this.props.pageNum;
		this.state.pageSize = this.props.pageSize || this.state.pageSize;
    this.fetchVerses();
  }

	componentWillReceiveProps (newProps) {
		this.state.pageNum = newProps.pageNum;
		this.state.pageSize = newProps.pageSize || this.state.pageSize;
	}

	onPageChange (pageNum) {

		//let pageNum = selectedEvent.eventKey - 1;

		this.state.pageNum = (pageNum - 1);
		this.fetchVerses();
	}

	renderPagination () {

		let items = this.state.totalPages,
			pageNum = this.state.pageNum;

		if (this.props.pagination === 'simple') {
			return (
				<div className='centered'>
					<Pagination
	          bsSize='medium'
	          first={true}
	          last={true}
						prev={true}
						next={true}
	          ellipsis={true}
	          items={items}
	          maxButtons={items > 3 ? 3 : items}
	          activePage={pageNum + 1}
	          onSelect={this.onPageChange.bind(this)} />
				</div>
			)
		}
		else if (this.props.pagination === 'infinite') {
			// listen of scroll event
		}
		else {

		}

		return null;
	}

	componentWillUnmount () {
		if (this.props.pagination === 'infinite') {
			// unlisten to scroll event
		}
	}

  render () {

		let isLastPage = (this.state.pageNum === this.state.totalPages - 1);

    return (
      <div className='verse-container'>
				{this.props.ruleCount && isLastPage ? (<RuleBlock ruleCount={2} showMore={true} />) : null}
				{this.renderPagination()}
        {this.state.loading ? (<div className='verse-line loader'>Loading...</div>) :
					_.map(this.state.verses, (verse, index) => (verse.verse ? (
	          <div key={'verse' + index} className='verse-block'>
	            <div className='verse-line first-line'>{verse.verse[0]}</div>
	            <div className='verse-line second-line'>{verse.verse[1]}</div>
	          </div>
	        ) : null))
				}
        {this.props.addVerse && isLastPage ? (<AddVerse validateVerse={this.validateVerse} onAdd={this.updatePoemPage} disabled={this.state.saving} />) : null}
      </div>
    )
  }
}
