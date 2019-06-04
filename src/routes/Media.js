import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Navigation } from '../components'

import Videos from './media/Videos'
import Photos from './media/Photos'

const items = [
  {
    text: 'Videos',
    to: '/media/videos'
  },
  {
    text: 'Photos',
    to: '/media/photos'
  }
]

export default function Media() {
  return (
    <div>
      <Navigation items={items} />
      <Switch>
        <Route path={items[0].to} component={Videos} />
        <Route path={items[1].to} component={Photos} />
      </Switch>
    </div>
  )
}
