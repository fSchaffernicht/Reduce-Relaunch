import React, { useEffect } from 'react'

export default function Media() {
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCCxaY-87Cazvpq7AIqWW8nA&maxResults=50&key=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(response => response.json())
      .then(result => {
        console.log('result', result)
      })
  }, [])
  return <div>media</div>
}
