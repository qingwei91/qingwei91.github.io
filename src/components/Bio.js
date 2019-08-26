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
        <div>
          I build software, I love writing down things I've learned. When I am free, I enjoy cooking.
        </div>
      </div>
      </div>
    )
  }
}

export default Bio
