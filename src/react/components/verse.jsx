import React, {Component} from 'react';
import request from 'superagent';
import _ from 'lodash';
import AddVerse from './add-verse.jsx';
import {Pagination} from 'react-bootstrap';

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
		totalCount: 0
  }

  constructor (props) {

    super(props);
    this.updatePoemPage = this.updatePoemPage.bind(this);
  }

  fetchVerses () {

    request
      .get('/api/versePage?a=' + Math.random())
			.query({pageNum: this.state.pageNum, pageSize: this.state.pageSize})
      .set('accept', 'application/json')
      .set('content-type', 'application/json')
      .end((err, response) => {
        this.setState({
          loading: false,
          verses: response.body.verses,
					totalCount: response.body.totalCount
        });
      });

    this.setState({
      loading: true
    });
  }

  updatePoemPage (verse) {
    this.fetchVerses();
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

		let items = Math.ceil(this.state.totalCount / this.state.pageSize),
			pageNum = this.state.pageNum < 0 ? (items + this.state.pageNum + 1) : (this.state.pageNum + 1);

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
	          activePage={pageNum}
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
    return (
      <div className='verse-container'>
				{this.renderPagination()}
        {this.state.loading ? (<div className='verse-line loader'>Loading...</div>) :
					_.map(this.state.verses, (verse, index) => (verse.verse ? (
	          <div key={'verse' + index} className='verse-block'>
	            <div className='verse-line first-line'>{verse.verse[0]}</div>
	            <div className='verse-line second-line'>{verse.verse[1]}</div>
	          </div>
	        ) : null))
				}
        {this.props.addVerse ? (<AddVerse onAdd={this.updatePoemPage} disabled={this.state.saving} />) : null}
      </div>
    )
  }
}
