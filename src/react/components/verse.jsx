import React, {Component} from 'react';
import request from 'superagent';
import _ from 'lodash';
import AddVerse from './add-verse.jsx';

export default class VerseComponent extends Component {

  state = {
    verses: [],
    loading: false,
    saving: false,
    lastId: null
  }

  constructor (props) {

    super(props);
    this.updatePoemPage = this.updatePoemPage.bind(this);
  }

  fetchVerses () {

    request
      .get('/api/allVerses?a=' + Math.random())
      .set('accept', 'application/json')
      .set('content-type', 'application/json')
      .end((err, response) => {
        this.setState({
          loading: false,
          verses: response.body
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
    this.fetchVerses();
  }

  render () {
    return (
      <div className='verse-container'>
        {_.map(this.state.verses, (verse, index) => (verse.verse ? (
          <div key={'verse' + index} className='verse-block'>
            <div className='verse-line first-line'>{verse.verse[0]}</div>
            <div className='verse-line second-line'>{verse.verse[1]}</div>
          </div>
        ) : null))}
        {this.state.loading ? (<div className='verse-line loader'>Loading...</div>) : null}
        {this.props.addVerse ? (<AddVerse onAdd={this.updatePoemPage} disabled={this.state.saving} />) : null}
      </div>
    )
  }
}
