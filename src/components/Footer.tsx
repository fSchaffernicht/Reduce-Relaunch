import React from 'react'

import styled from 'styled-components'

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 5%;
  left: 10%;
  right: 0;
  z-index: 1;
  width: 100%;
`

const List = styled.div`
  display: block;
  margin: 0;
  padding: 0;
`

const ListItem = styled.div`
  padding-right: 2em;
  font-size: 1em;
  margin-bottom: 0.5rem;
`

const Link = styled.a`
  color: white;
`
interface Props {
  items: {
    text: string
    href: string
  }[]
}

export default function Footer(props: Props) {
  const { items } = props

  return (
    <StyledFooter>
      <List>
        {items.map(({ text, href }, index) => (
          <ListItem key={index}>
            <Link href={href}>{text}</Link>
          </ListItem>
        ))}
      </List>
    </StyledFooter>
  )
}
