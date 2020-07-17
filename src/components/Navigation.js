import React from "react"
import { Link } from "./"
import "./navigation.css"

import { classNames } from "../util"

export default function Navigation({ items, responsive = false }) {
  const classes = classNames({
    navigation: true,
  })

  return (
    <ul className={classes}>
      {items.map(({ text, to, href, ...rest }, index) => (
        <li className="navigation-item" key={index}>
          {href ? (
            <a className="link" href={href}>
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
