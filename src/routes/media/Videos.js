import React, { useState } from 'react'

import { Video, Loader, Modal } from '../../components'

import { useFetch, mapVideoData, filterVideos } from '../../util'

export default function Media() {
  const [current, setCurrent] = useState({ id: null, visible: false })
  const videos = useFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCCxaY-87Cazvpq7AIqWW8nA&maxResults=50&key=${
      process.env.REACT_APP_API_KEY
    }`
  )

  function handleClick(id) {
    setCurrent({ id, visible: true })
  }

  function handleClose() {
    setCurrent(e => ({ ...e, visible: false }))
  }

  if (!videos) return <Loader />

  const { items } = videos

  if (items && items.length > 0) {
    return (
      <div>
        {filterVideos(items).map((video, index) => {
          const videoData = mapVideoData(video)
          return <Video onClick={handleClick} key={index} {...videoData} />
        })}
        <Modal onClose={handleClose} isOpen={current.visible}>
          <iframe
            className='video-player'
            title='youtube'
            id='ytplayer'
            type='text/html'
            width='800'
            height='500'
            src={`https://www.youtube.com/embed/${current.id}`}
            frameBorder='0'
            allowFullScreen
          />
        </Modal>
      </div>
    )
  }

  return 'Videos konnten nicht geladen werden. Versuche es später nochmal.'
}
