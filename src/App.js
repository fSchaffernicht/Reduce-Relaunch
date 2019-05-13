import React from 'react'
import logo from './logo.svg'
import './App.css'

import { Navigation } from './components'

const items = [
  {
    text: 'Home',
    to: '/'
  },
  {
    text: 'Music',
    to: '/music'
  },
  {
    text: 'Contact',
    to: '/contact'
  }
]

function App() {
  return (
    <div className='container'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Navigation items={items} />
      </header>
    </div>
  )
}

export default App
