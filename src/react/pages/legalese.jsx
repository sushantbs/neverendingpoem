import React, {Component} from 'react';
import Header from '../components/header.jsx';

export default class Legalpage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3 className='centered'>Legalese</h3>
        <div className='tab-content-section'>
          <p>Details of the Creative Commons License in use on this site can be read at: <a href='http://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank'>http://creativecommons.org/licenses/by-nc-sa/4.0/</a></p>
					<p>Other than what it already states, the following two terms apply as well.</p>
					<p>1. If any visitor-contributed content is used anywhere outside this website by the website owner, no details of the visitor (such as username, IP address, or anything else) will be used.</p>
					<p>2. All content on this website, including that contributed by visitors to the site, can be used by the owner of the website for commercial purposes.</p>
        </div>
      </div>);
  }
}
