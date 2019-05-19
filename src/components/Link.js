import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import './link.css'

export default function Link({ text, ...rest }) {
  return (
    <RouterLink className='link' {...rest}>
      {text}
    </RouterLink>
  )
}
