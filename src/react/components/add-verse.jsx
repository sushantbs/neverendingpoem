import React, {Component} from 'react';
import request from 'superagent';
import {Button} from 'react-bootstrap';
import _ from 'lodash';

export default class AddVerse extends Component {

  state = {
    firstLine: '',
    secondLine: '',
    saving: false,
    error: null
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

  submitLines (e) {

    e.preventDefault();

    let {firstLine, secondLine} = this.state;

    if (!_.trim(firstLine) || !_.trim(secondLine)) {
      this.setState({
        error: '*Neither of the lines can be blank'
      });

      return;
    }

    request
      .post('/api/addVerse')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
			.set('xsrf', nepGlobal.xsrfToken)
      .send({firstLine, secondLine})
      .end((err, response) => {
        if (err) {
          console.error(err);
          return;
        }

        this.setState({error: null, saving: false, firstLine: '', secondLine: ''});
        this.props.onAdd();
      });

    this.setState({saving: true});
  }

  render () {
    return (
      <div className='add-verse-container'>
        <h4>Add Your Verse</h4>
        {this.state.error ? <div className='error'>{this.state.error}</div> : null}
        <form className='form-group' onSubmit={this.submitLines}>
          <input className='form-control' placeholder='First line of your verse' value={this.state.firstLine} disabled={this.state.saving} onChange={this.updateState.bind(this, 'firstLine')} />
          <input className='form-control' placeholder='Second line of your verse' value={this.state.secondLine} disabled={this.state.saving} onChange={this.updateState.bind(this, 'secondLine')} />
					<br />
					<input className='btn btn-primary' type='submit' value='SUBMIT'/>
        </form>
      </div>);
  }
}
