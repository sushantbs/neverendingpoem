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
          <p>If you make a mistake in your submission, there is no way for you to correct it, so try not make any. But if you send me an email at <a href='mailto:admin@neverendingpoem.com'>admin@neverendingpoem.com</a>, specifically stating what mistake you made and what correction you want. I will get to it when I can.</p>
					<p>Also, as a matter of design, there is no place for you to leave any comments. But then again, writing a collaborative poem should be considered social enough already, right? However, if there is something you want to say to me, use the same email address given above, and I will get back to you if a reply is in order. However, if I get spam from you, I know how to block your IP address. :)</p>
        </div>
      </div>);
  }
}
