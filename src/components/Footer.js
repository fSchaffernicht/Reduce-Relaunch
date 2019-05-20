import React from 'react'
import { Navigation } from './'
import './footer.css'

const items = [
  {
    text: 'Facebook',
    href: 'https://www.facebook.com/reduceBand'
  },
  {
    text: 'Instagram',
    href: '/'
  },
  {
    text: 'E-Mail',
    href: 'mailto:reduce.band@gmail.com'
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
