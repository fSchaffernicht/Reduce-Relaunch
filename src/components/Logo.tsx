import React from 'react'
import logo from '../logo.svg'
import styled from 'styled-components'

const Image = styled.img`
  margin-right: 5em;
`

export default function Logo() {
  return <Image src={logo} className='logo' alt='logo' />
}
