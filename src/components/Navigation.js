import React, { useState } from 'react'
import { Link } from './'
import './navigation.css'

import { classNames } from '../util'

import useWindowSize from '../util/useWindowSize'

export default function Navigation({ items, responsive = false }) {
  const [isOpen, setOpen] = useState(false)
  const { width } = useWindowSize()

  const classes = classNames({
    navigation: true,
    responsive: responsive && width < 600
  })

  if (width < 600) {
    return (
      <div>
        <ul className={classes}>
          <svg
            height='30px'
            id='Layer_1'
            version='1.1'
            viewBox='0 0 512 512'
            width='30px'
            fill='white'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
          </svg>
          <div onClick={() => setOpen(!isOpen)}>hamburger</div>
          {isOpen &&
            items.map(({ text, to, href, ...rest }, index) => (
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
      </div>
    )
  }

  return (
    <ul className={classes}>
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
