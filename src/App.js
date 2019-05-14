import React from 'react'
import './App.css'

import { Navigation } from './components'

import Home from './routes/Home'
import Story from './routes/Story'
import Media from './routes/Media'
import Contact from './routes/Contact'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const items = [
  {
    text: 'Home',
    to: '/'
  },
  {
    text: 'Media',
    to: '/media'
  },
  {
    text: 'Story',
    to: '/story'
  },
  {
    text: 'Contact',
    to: '/contact'
  }
]

function App() {
  return (
    <Router>
      <div className='container'>
        <header className='header'>
          <Navigation items={items} />
        </header>
        <Switch>
          <Route exact path={items[0].to} component={Home} />
          <Route path={items[1].to} component={Media} />
          <Route path={items[2].to} component={Story} />
          <Route path={items[3].to} component={Contact} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
