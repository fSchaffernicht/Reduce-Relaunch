import React from 'react'
import { Logo, Audio } from '../components'
import './home.css'

import Reduce from '../assets/reduce-final.mp3'
import City from '../assets/city-final.mp3'

const audioItems = [
  {
    title: 'Reduce',
    audio: Reduce
  },
  {
    title: 'City',
    audio: City
  }
]

export default function Home() {
  return (
    <div>
      <div className='logo-container'>
        <Logo />
        <Audio items={audioItems} />
      </div>
      <ul className='list'>
        <li className='list-item'>Band aus Frankfurt am Main</li>
        <li className='list-item'>Kein Pop!</li>
        <li className='list-item'>Mixed Martial Rock</li>
        <li className='list-item'>Kann/Will live spielen</li>
      </ul>
    </div>
  )
}
