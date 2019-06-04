import React from 'react'
import { Link } from './'
import './navigation.css'

export default function Navigation({ items }) {
  return (
    <ul className='navigation'>
      {items.map(({ text, to, href, ...rest }, index) => (
        <li className='navigation-item' key={index}>
          {href ? (
            <a className='link' href={href}>
              {text}
            </a>
          ) : (
            <Link to={to} text={text} {...rest} />
          )}
        </li>
      ))}
    </ul>
  )
}
