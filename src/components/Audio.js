import React, { useRef, useReducer } from 'react'
import { CSSTransition } from 'react-transition-group'
import './audio.css'

const initialState = {
  current: 0,
  play: false,
  pause: false,
  stop: false,
  duration: 0
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'play':
      return {
        ...state,
        play: true,
        pause: false,
        stop: false,
        current: payload
      }

    case 'pause':
      return {
        ...state,
        play: false,
        pause: true,
        stop: false
      }

    case 'stop':
      return {
        ...state,
        play: false,
        pause: false,
        stop: true,
        duration: 0
      }

    case 'duration':
      return {
        ...state,
        duration: payload
      }

    case 'next':
      return {
        ...state,
        play: true,
        current: state.current + 1,
        stop: false,
        pause: false,
        duration: 0
      }

    case 'prev':
      return {
        ...state,
        play: true,
        current: state.current - 1,
        stop: false,
        pause: false,
        duration: 0
      }
    default:
      return state
  }
}

export default function Audio({ items }) {
  const [{ current, play, pause, duration }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const audioRef = useRef()
  const durationRef = useRef()

  // save audioRef with closure
  const getSong = getSongWithRef(audioRef)

  function onTimeUpdate(event) {
    const { currentTime, duration } = event.target
    dispatch({ type: 'duration', payload: currentTime })

    if (currentTime === duration) {
      if (!!items[current + 1]) {
        onNextSong()
      } else {
        onStop()
      }
    }
  }

  function onNextSong() {
    dispatch({ type: 'stop' })

    getSong(current).pause()
    getSong(current).currentTime = 0

    dispatch({ type: 'next' })

    getSong(current + 1).play()
  }

  function onPrevSong() {
    dispatch({ type: 'stop' })

    getSong(current).pause()
    getSong(current).currentTime = 0

    dispatch({ type: 'prev' })

    getSong(current - 1).play()
  }

  function onPlay() {
    dispatch({ type: 'play', payload: current })
    getSong(current).play()
  }

  function onPause() {
    dispatch({ type: 'pause' })
    getSong(current).pause()
  }

  function onStop() {
    dispatch({ type: 'stop' })

    getSong(current).pause()
    getSong(current).currentTime = 0
  }

  function onDurationClick(event) {
    const songLength = getSong(current).duration
    const barWidth = getWidth(durationRef)
    const clicked = event.nativeEvent.offsetX

    const x = (clicked / barWidth) * songLength

    dispatch({ type: 'duration', payload: x })
    getSong(current).currentTime = x
  }

  const songLength = getSong(current).duration
  const barWidth = getWidth(durationRef)

  const style = {
    width: `${barWidth * (duration / songLength)}px`
  }

  return (
    <div className='audio-player'>
      <CSSTransition
        in={play || pause}
        timeout={600}
        classNames='audio'
        unmountOnExit
      >
        <div className='audio-player-title'>{items[current].title}</div>
      </CSSTransition>
      <div className='audio-elements-container'>
        <div className='play-stop'>
          {play ? <Pause onClick={onPause} /> : <Play onClick={onPlay} />}
          <CSSTransition
            in={play || pause}
            timeout={300}
            classNames='audio'
            unmountOnExit
          >
            <Stop onClick={onStop} />
          </CSSTransition>
        </div>
        <CSSTransition
          in={play || pause}
          timeout={300}
          classNames='audio'
          unmountOnExit
        >
          <div className='prev-next'>
            <Prev visible={!!items[current - 1]} onClick={onPrevSong} />
            <Next visible={!!items[current + 1]} onClick={onNextSong} />
          </div>
        </CSSTransition>
      </div>
      <CSSTransition
        in={play || pause}
        timeout={400}
        classNames='audio'
        unmountOnExit
      >
        <div
          className='audio-duration-wrapper'
          onClick={onDurationClick}
          ref={durationRef}
        >
          <div className='audio-duration'>
            <div className='audio-duration-fill' style={{ ...style }} />
          </div>
        </div>
      </CSSTransition>
      <div ref={audioRef}>
        {items.map((item, index) => (
          <audio key={index} preload='true' onTimeUpdate={onTimeUpdate}>
            <source key={index} src={item.audio} />
          </audio>
        ))}
      </div>
    </div>
  )
}

function getWidth(element) {
  if (element && element.current) {
    return element.current.clientWidth
  }

  return undefined
}

function getSongWithRef(ref) {
  return function(song) {
    if (ref && ref.current) {
      return ref.current.children[song]
    }

    return {}
  }
}

const Stop = ({ onClick }) => (
  <div onClick={onClick} className='audio-element'>
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
        fillRule='evenodd'
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

const Play = ({ onClick }) => (
  <div onClick={onClick} className='audio-element'>
    <svg
      width='23px'
      height='28px'
      viewBox='0 0 23 28'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs />
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
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
  </div>
)

const Pause = ({ onClick }) => (
  <div onClick={onClick} className='audio-element'>
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
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g
          id='Desktop-HD'
          transform='translate(-1097.000000, -395.000000)'
          fill='#FF6450'
          fillRule='nonzero'
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
  </div>
)

const Next = ({ onClick, visible }) => {
  const classes = visible ? 'audio-element' : 'audio-element not-visible'
  return (
    <div className={classes} onClick={onClick}>
      <svg
        width='23px'
        height='20px'
        viewBox='0 0 23 20'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs />
        <g
          id='Page-1'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g
            id='Desktop-HD'
            transform='translate(-1247.000000, -399.000000)'
            fill='#FFFFFF'
            fillRule='nonzero'
          >
            <g id='Group' transform='translate(1247.000000, 399.000000)'>
              <g id='Orion_play-Copy'>
                <path
                  d='M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z'
                  id='Shape'
                />
              </g>
              <g
                id='Orion_play-Copy-2'
                transform='translate(8.000000, 0.000000)'
              >
                <path
                  d='M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z'
                  id='Shape'
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

const Prev = ({ onClick, visible }) => {
  const classes = visible ? 'audio-element' : 'audio-element not-visible'

  return (
    <div className={classes} onClick={onClick}>
      <svg
        width='23px'
        height='20px'
        viewBox='0 0 23 20'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs />
        <g
          id='Page-1'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g
            id='Desktop-HD'
            transform='translate(-1204.000000, -399.000000)'
            fill='#FFFFFF'
            fillRule='nonzero'
          >
            <g
              id='Group'
              transform='translate(1215.500000, 409.000000) rotate(-180.000000) translate(-1215.500000, -409.000000) translate(1204.000000, 399.000000)'
            >
              <g id='Orion_play-Copy'>
                <path
                  d='M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z'
                  id='Shape'
                />
              </g>
              <g
                id='Orion_play-Copy-2'
                transform='translate(8.000000, 0.000000)'
              >
                <path
                  d='M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z'
                  id='Shape'
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
