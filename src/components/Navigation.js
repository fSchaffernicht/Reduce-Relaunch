import React from 'react'
import { Link } from './'

export default function Navigation({ items }) {
  return (
    <ul>
      {items.map(({ text, to }, index) => (
        <li key={index}>
          <Link to={to} text={text} />
        </li>
      ))}
    </ul>
  )
}
