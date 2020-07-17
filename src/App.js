import React, { useState } from "react"
import "./App.css"

import useInterval from "./util/useInterval"

import { Footer } from "./components"

import Home from "./routes/Home"
// import Story from "./routes/Story"
// import Media from "./routes/Media"
// import Contact from "./routes/Contact"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const items = [
  {
    text: "Home",
    to: "/",
    exact: true,
  },
  {
    text: "Media",
    to: "/media",
    children: [
      {
        text: "Videos",
        to: "/media/videos",
      },
      {
        text: "Photos",
        to: "/media/photos",
      },
    ],
  },
  {
    text: "Story",
    to: "/story",
  },
  {
    text: "Contact",
    to: "/contact",
  },
]

const imageClasses = ["one", "two", "three", "four", "five", "six", "seven"]

function App() {
  const [current, setCurrent] = useState(0)

  useInterval(() => {
    if (current === imageClasses.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }, 10 * 1000)

  return (
    <Router>
      <div className="container">
        {/* <header className="header">
          <Navigation responsive items={items} />
        </header> */}
        <Switch>
          <Route exact path={items[0].to} component={Home} />
          {/* <Route path={items[1].to} component={Media} />
          <Route path={items[2].to} component={Story} />
          <Route path={items[3].to} component={Contact} /> */}
        </Switch>
        <Footer />
      </div>
      {imageClasses.map((x, i) => (
        <div
          key={i}
          className={`background ${x} ${i === current ? "fade-in" : ""}`}
        />
      ))}

      <div className="background-layer" />
    </Router>
  )
}

export default App
