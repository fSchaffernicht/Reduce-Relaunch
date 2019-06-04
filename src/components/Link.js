import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import './link.css'

export default function Link({ text, ...rest }) {
  return (
    <RouterLink className='link' activeClassName='active' {...rest}>
      {text}
    </RouterLink>
  )
}
