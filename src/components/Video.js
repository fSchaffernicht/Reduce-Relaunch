import React from 'react'
import './video.css'

export default function Video({
  title,
  thumbnails,
  description,
  date,
  videoId,
  onClick
}) {
  return (
    <div className='video-container' onClick={() => onClick(videoId)}>
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
