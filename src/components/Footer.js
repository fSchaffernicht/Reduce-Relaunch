import React from 'react'
import { Navigation } from './'
import './footer.css'

const items = [
  {
    text: 'Facebook',
    to: 'https://www.facebook.com/reduceBand'
  },
  {
    text: 'Instagram',
    to: '/'
  },
  {
    text: 'E-Mail',
    to: '/'
  }
]

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-navigation-container'>
        <Navigation items={items} />
      </div>
    </footer>
  )
}
