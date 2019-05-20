import React, { useState } from 'react'
import moment from 'moment'

import { Video, Loader, Modal } from '../components'

import { useFetch } from '../util'

export default function Media() {
  const [id, setId] = useState(null)
  const videos = useFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCCxaY-87Cazvpq7AIqWW8nA&maxResults=50&key=${
      process.env.REACT_APP_API_KEY
    }`
  )

  function handleClick(id) {
    setId(id)
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
        <Modal isOpen={id}>
          <iframe
            className='video-player'
            title='youtube'
            id='ytplayer'
            type='text/html'
            width='800'
            height='500'
            src={`https://www.youtube.com/embed/${id}`}
            frameborder='0'
            allowfullscreen
          />
        </Modal>
      </div>
    )
  }

  return 'no videos here'
}

function mapVideoData(data) {
  return {
    videoId: data.id.videoId,
    title: data.snippet.title,
    description: data.snippet.description,
    date: moment(data.snippet.publishedAt).format('DD.MM.YYYY'),
    thumbnails: data.snippet.thumbnails
  }
}

function filterVideos(videos) {
  return videos.filter(video => video.snippet.title !== 'Reduce')
}
