import React from 'react'
import './video.css'

export default function Video({
  title,
  thumbnails,
  description,
  date,
  videoId
}) {
  console.log('thumb', thumbnails)
  return (
    <div className='video-container'>
      {/* <iframe
        className='video-player'
        title='youtube'
        id='ytplayer'
        type='text/html'
        width='450'
        height='200'
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder='0'
        allowfullscreen
      /> */}
      <div className='video-player'>
        <img
          alt={title}
          src={thumbnails.medium.url}
          height={thumbnails.medium.height}
          width={thumbnails.medium.width}
        />
      </div>
      <div className='video-info-container'>
        <div className='video-date'>{date}</div>
        <div className='video-title'>{title}</div>
        <div className='video-description'>{description}</div>
      </div>
    </div>
  )
}
