import React from 'react'
import './photos.css'

export default function Photo({ img, date, likes, comments, id, onClick }) {
  const likeText = likes !== 1 ? `${likes} likes` : `${likes} like`
  const commentCount =
    comments.count !== 1
      ? `${comments.count} comments`
      : `${comments.count} comment`

  return (
    <div onClick={() => onClick(id)} className='photo-container'>
      {/* <div>{date}</div> */}
      <div className='photo-info-container'>
        <div className='photo-info-text'>{likeText}</div>
        <div className='photo-info-text'>{commentCount}</div>
      </div>
      <img
        className='photo-image'
        src={img.url}
        width={img.width}
        height={img.height}
        alt='Instagram'
      />
    </div>
  )
}
