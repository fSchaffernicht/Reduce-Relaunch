import React from 'react'

export default function Video({
  title,
  description,
  date,
  thumbnails,
  videoId
}) {
  console.log(title, description, date, thumbnails, videoId)
  return (
    <div className='video-container'>
      <div className='video-date'>{date}</div>
      <div className='video-title'>{title}</div>
      <div className='video-description'>{description}</div>
      <div className='video-image-container'>
        <img
          alt={title}
          src={thumbnails.default.url}
          width={thumbnails.default.width}
          height={thumbnails.default.height}
        />
      </div>
    </div>
  )
}
