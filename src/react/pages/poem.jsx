import React, {Component} from 'react';
import Header from '../components/header.jsx';
import Verses from '../components/verse.jsx';
import AddVerse from '../components/add-verse.jsx';
import InfiniteScroll from 'react-infinite-scroller';
import request from 'superagent';

export default class Poempage extends Component {

  state = {
    pageNum : -1,
    pageSize: 10,
    hasMore: true,
    verses: [],
    totalCount: -1
  }

  constructor (props) {
    super(props);
  }

  fetchMore () {
    request
      .get('/api/versePage?a=' + Math.random())
      .query({pageNum: this.state.pageNum + 1, pageSize: this.state.pageSize})
      .set('accept', 'application/json')
      .set('content-type', 'application/json')
      .end((err, response) => {
        if (err) {
          console.log(err);
          return;
        }

        let fetchedVerse = this.state.verses.concat(response.body.verses);
        this.setState({
          verses: fetchedVerse,
          pageNum: response.body.pageNum,
          totalCount: response.body.totalCount,
          hasMore: (response.body.totalCount !== fetchedVerse.length)
        });
      });
  }

  renderVerse () {
    return _.map(this.state.verses, (verse, index) => (verse.verse ? (
      <div key={'verse' + index} className='verse-block'>
        <div className='verse-line first-line'>{verse.verse[0]}</div>
        <div className='verse-line second-line'>{verse.verse[1]}</div>
      </div>
    ) : null));
  }

  render () {
    return (
      <div>
				<h3 className='centered'>The Poem</h3>
        <div className='tab-content-section'>
          <div className='verse-container'>
            <InfiniteScroll
              pageStart={this.state.pageNum}
              loadMore={this.fetchMore.bind(this)}
              hasMore={this.state.hasMore}
              useWindow={true}
              threshold={200}
              loader={<div className='verse-line loader'>Loading...</div>}>

              {this.renderVerse()}
            </InfiniteScroll>
          </div>
        </div>
      </div>);
  }
}
