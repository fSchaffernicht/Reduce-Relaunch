import React, { useState } from 'react'
import './App.css'

import useInterval from './util/useInterval'

import { Footer, Logo, Audio } from './components'

const imageClasses = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']

const audioItems = [
  {
    title: 'The Nihilist',
    audio: require('./assets/The_Nihilist.mp3'),
  },
  {
    title: 'A Long Trip',
    audio: require('./assets/A_Long_Trip.mp3'),
  },
  {
    title: 'Getting Lost',
    audio: require('./assets/Getting_Lost.mp3'),
  },
  {
    title: 'In Consequence',
    audio: require('./assets/In_Consequence.mp3'),
  },
  {
    title: '21 Gramm Loss',
    audio: require('./assets/21_Gramm_Loss.mp3'),
  },
  {
    title: 'Bering Sea',
    audio: require('./assets/Bering_Sea.mp3'),
  },
]

const footerItems = [
  {
    text: 'Spotify',
    href: 'https://open.spotify.com/album/7r6y8kTHkTdQXGF2lAmqt2',
  },
  {
    text: 'YouTube',
    href: 'https://www.youtube.com/results?search_query=reduce+sigma',
  },
  {
    text: 'Facebook',
    href: 'https://www.facebook.com/reduceBand',
  },
  {
    text: 'Instagram',
    href: 'https://www.instagram.com/reduce_band/',
  },
  {
    text: 'reduce.band@gmail.com',
    href: 'mailto:reduce.band@gmail.com',
  },
]

function App() {
  const [current, setCurrent] = useState(0)

  useInterval(() => {
    setCurrent((current % (imageClasses.length - 1)) + 1)
  }, 10 * 1000)

  return (
    <div>
      <div className="container">
        <div className="logo-container">
          <Logo />
          <Audio items={audioItems} />
        </div>
        <Footer items={footerItems} />
      </div>
      {imageClasses.map((x, i) => (
        <div
          key={i}
          className={`background ${x} ${i === current ? 'fade-in' : ''}`}
        />
      ))}
      <div className="background-layer" />
    </div>
  )
}

export default App
