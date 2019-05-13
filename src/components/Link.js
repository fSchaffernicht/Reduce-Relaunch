import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export default function Link({ text, ...rest }) {
  return <RouterLink {...rest}>{text}</RouterLink>
}
