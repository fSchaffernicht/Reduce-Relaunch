import React, { useState, useRef } from 'react'
import Song from '../assets/reduce-final.mp3'

export default function Audio() {
  const [play, setPlay] = useState(false)
  const audioRef = useRef()

  function onTogglePlay() {
    setPlay(!play)

    if (play) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  function onStop() {
    setPlay(false)
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  return (
    <div className='audio-player'>
      <div onClick={onTogglePlay}>{play ? <Pause /> : <Play />}</div>
      {play && <Stop onClick={onStop} />}
      <audio ref={audioRef} preload='true'>
        <source src={Song} />
      </audio>
    </div>
  )
}

const Stop = ({ onClick }) => (
  <div onClick={onClick}>
    <svg
      width='27px'
      height='27px'
      viewBox='0 0 27 27'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs />
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fill-rule='evenodd'
      >
        <g
          id='Desktop-HD'
          transform='translate(-1139.000000, -395.000000)'
          fill='#FF6450'
        >
          <rect
            id='Rectangle-2'
            x='1139'
            y='395'
            width='27'
            height='27'
            rx='2'
          />
        </g>
      </g>
    </svg>
  </div>
)

const Play = () => (
  <svg
    width='23px'
    height='28px'
    viewBox='0 0 23 28'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs />
    <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g
        id='Desktop-HD'
        transform='translate(-1054.000000, -395.000000)'
        fill='#FF6450'
        fillRule='nonzero'
      >
        <g id='Orion_play' transform='translate(1054.000000, 395.000000)'>
          <path
            d='M0,2 C0,0.9 0.777,0.454 1.727,1.008 L22.273,12.992 C22.7003157,13.1428938 22.9860548,13.5468249 22.9860548,14 C22.9860548,14.4531751 22.7003157,14.8571062 22.273,15.008 L1.728,26.992 C0.777,27.546 0,27.1 0,26 L0,2 Z'
            id='Shape'
          />
        </g>
      </g>
    </g>
  </svg>
)

const Pause = () => (
  <svg
    width='19px'
    height='28px'
    viewBox='0 0 19 28'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs />
    <g
      id='Page-1'
      stroke='none'
      stroke-width='1'
      fill='none'
      fill-rule='evenodd'
    >
      <g
        id='Desktop-HD'
        transform='translate(-1097.000000, -395.000000)'
        fill='#FF6450'
        fill-rule='nonzero'
      >
        <g id='pause-button' transform='translate(1097.000000, 395.000000)'>
          <path
            d='M8,26.9909966 C8,27.5481965 7.52243178,28 6.93333333,28 L1.06666667,28 C0.477568221,28 0,27.5482488 0,26.9909966 L0,1.00900336 C0,0.451751192 0.477568221,0 1.06666667,0 L6.93333333,0 C7.52243178,0 8,0.451751192 8,1.00900336 L8,26.9909966 Z'
            id='Shape'
          />
          <path
            d='M19,26.9909966 C19,27.5481965 18.5224318,28 17.9333333,28 L12.0666667,28 C11.4775682,28 11,27.5482488 11,26.9909966 L11,1.00900336 C11,0.451751192 11.4775682,0 12.0666667,0 L17.9333333,0 C18.5224318,0 19,0.451751192 19,1.00900336 L19,26.9909966 Z'
            id='Shape'
          />
        </g>
      </g>
    </g>
  </svg>
)
