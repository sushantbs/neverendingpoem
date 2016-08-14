import React, {Component} from 'react';
import request from 'superagent';
import {Button} from 'react-bootstrap';
import _ from 'lodash';

export default class AddVerse extends Component {

  state = {
    firstLine: '',
    secondLine: '',
    saving: false
  }

  constructor (props) {
    super(props);
    this.submitLines = this.submitLines.bind(this);
  }

  componentDidMount () {

  }

  updateState (line, e) {
    var update = {};

    update[line] = e.target.value;
    this.setState(update);
  }

  submitLines () {
    let {firstLine, secondLine} = this.state;

    request
      .post('/api/addVerse')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .send({firstLine, secondLine})
      .end((err, response) => {
        if (err) {
          console.error(err);
          return;
        }

        this.setState({saving: false, firstLine: '', secondLine: ''});
        this.props.onAdd();
      });

    this.setState({saving: true});
  }

  render () {
    return (
      <div className='add-verse-container'>
        <h4>Add Your Verse</h4>
        <input placeholder='First line of your verse' value={this.state.firstLine} disabled={this.state.saving} onChange={this.updateState.bind(this, 'firstLine')} />
        <input placeholder='Second line of your verse' value={this.state.secondLine} disabled={this.state.saving} onChange={this.updateState.bind(this, 'secondLine')} />
        <Button bsStyle='primary' onClick={this.submitLines}>SUBMIT</Button>
      </div>);
  }
}
