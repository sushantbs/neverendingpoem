import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';

export default class Legalese extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='footer-section'>
				<div >
					<div className='footer-content'>
						<center>
							<h2>Legalese</h2>
							<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
								<img alt="Creative Commons License" style={{borderWidth:0}} src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" />
							</a>
							<br />
							Never Ending Poem by Himanshu Goenka is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
							<br />
							Permissions beyond the scope of this license may be available at <Link to="/legalese" href="legalese">Legalese</Link>.
						</center>
					</div>
	      </div>
			</div>);
  }
}
