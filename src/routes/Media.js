import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { Video, Loader } from '../components'

export default function Media() {
  const [videos, setVideos] = useState(null)

  useEffect(() => {
    if (!videos) {
      console.log('refetch')
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCCxaY-87Cazvpq7AIqWW8nA&maxResults=50&key=${
          process.env.REACT_APP_API_KEY
        }`
      )
        .then(response => response.json())
        .then(result => {
          setVideos(result)
        })
    }
  }, [videos])

  if (!videos) return <Loader />

  const { items } = videos

  if (items && items.length > 0) {
    return filterVideos(items).map((video, index) => {
      const videoData = mapVideoData(video)
      return <Video key={index} {...videoData} />
    })
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
