import React, {Component} from 'react';
import Header from '../components/header.jsx';

export default class Contactpage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3 className='centered'>Contact</h3>
        <div className='tab-content-section'>
          <p>If you make a mistake in your submission, there is no way to correct it. Except, you can send me an email at <a href='mailto:admin@neverendingpoem.com' target='_blank'>admin@neverendingpoem.com</a>, specifically stating what mistake you made and what correction you want. I will get to it soon enough.</p>
          <p>Also, there is no place for you to leave any comments. Writing a poem together should be social enough, right? However, if there is something you want to say to me, use the same email address given above, and I will get back to you if a reply is in order. However, if I get spam from you, I know how to block your IP address. :)</p>
          <p>I know better than anyone else that this site is not perfect, but I ain't no techie. So if you have any ideas to make it better and if you can help and also want to help, get in touch! I may not agree with your idea(s) but maybe I will.</p>
        </div>
      </div>);
  }
}
