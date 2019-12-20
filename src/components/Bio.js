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
        <div>I like to talk about stuff I have no idea about. Sometimes I even write about them.</div>
      </div>
      </div>
    )
  }
}

export default Bio
