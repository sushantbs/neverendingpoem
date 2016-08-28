import React, {Component} from 'react';
import Header from '../components/header.jsx';

export default class Aboutpage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3 className='centered'>About the Poem</h3>
        <div className='tab-content-section'>
          <p>It was on a hot summer day many years ago<br/>
						no electricity, I was wiping sweat from my brow<br/>
						I had this idea to write a poem with no end<br/>
						perhaps to document a lot was my intent.</p>

					<p>So I began, writing a line or two whenever I felt like, and writing
						about whatever I felt like. And of course, I had some sort of a hook
						to maintain continuity. A few months and a few hundred lines later, I
						lost the writing pad I had been scribbling in, and after moaning for a
						bit, forgot all about it. Some time in 2013, I was telling some friend
						about it and I suddenly realised I could do it all over again, and
						this time, bring in other people too.</p>

					<p>This is the result. I hope it will attract both those who like to
						write and also to talk about it, as well as those who think they have
						no talent but like to write anyway. Since this is totally anonymous,
						no one is judging anyone (except me, of course!)
						and the resultant verse will be an amalgamation of people cutting
						across borders, age, gender, race and various other boundaries that
						separate us usually. What it will read like is anyone's guess, but the
						process promises to be fun!</p>
        </div>
      </div>);
  }
}
