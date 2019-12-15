import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div>
        <img src={profilePic} alt="profile-pic"/>
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <div>I am software developer. I am fascinated by complexity, I am currently interested in Distributed System.</div>
      </div>
      </div>
    )
  }
}

export default Bio
