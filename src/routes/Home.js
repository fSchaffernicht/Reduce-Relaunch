import React from 'react'
import { Logo, Audio } from '../components'
import './home.css'

export default function Home() {
  return (
    <div>
      <div className='logo-container'>
        <Logo />
        <Audio />
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
