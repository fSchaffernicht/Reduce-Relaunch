import React, { useEffect, useState } from 'react'

import { Video } from '../components'

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

  if (!videos) return null

  const { items } = videos

  // console.log('items', items)

  if (items && items.length > 0) {
    return items.map((video, index) => {
      const videoData = mapVideoData(video)
      return <Video {...videoData} />
    })
  }

  return 'no videos here'
}

function mapVideoData(data) {
  return {
    videoId: data.id.videoId,
    title: data.snippet.title,
    description: data.snippet.description,
    date: data.snippet.publishedAt,
    thumbnails: data.snippet.thumbnails
  }
}
