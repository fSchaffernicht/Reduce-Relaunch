import React from 'react'
import { Link } from './'
import './navigation.css'

export default function Navigation({ items }) {
  return (
    <ul className='navigation'>
      {items.map(({ text, to, href }, index) => (
        <li className='navigation-item' key={index}>
          {href ? (
            <a className='link' href={href}>
              {index !== items.length - 1 ? `${text} |` : text}
            </a>
          ) : (
            <Link
              to={to}
              text={index !== items.length - 1 ? `${text} |` : text}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
