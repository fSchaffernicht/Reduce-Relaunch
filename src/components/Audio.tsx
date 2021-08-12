import React, { useRef, useReducer } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import styled from 'styled-components'

enum Actions {
  PLAY,
  PAUSE,
  STOP,
  DURATION,
  NEXT,
  PREV,
}

interface actionType<payload> {
  type: Actions
  payload?: payload
}

const initialState = {
  current: 0,
  play: false,
  pause: false,
  stop: false,
  duration: 0,
}

interface State {
  current: number
  play: boolean
  pause: boolean
  stop: boolean
  duration: number
}

function reducer(state: State, { type, payload }: actionType<number>): State {
  switch (type) {
    case Actions.PLAY:
      return {
        ...state,
        play: true,
        pause: false,
        stop: false,
        current: payload || 0,
      }

    case Actions.PAUSE:
      return {
        ...state,
        play: false,
        pause: true,
        stop: false,
      }

    case Actions.STOP:
      return {
        ...state,
        play: false,
        pause: false,
        stop: true,
        duration: 0,
      }

    case Actions.DURATION:
      return {
        ...state,
        duration: payload || 0,
      }

    case Actions.NEXT:
      return {
        ...state,
        play: true,
        current: state.current + 1,
        stop: false,
        pause: false,
        duration: 0,
      }

    case Actions.PREV:
      return {
        ...state,
        play: true,
        current: state.current - 1,
        stop: false,
        pause: false,
        duration: 0,
      }
    default:
      return state
  }
}

const AudioPlayer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  svg {
    cursor: pointer;

    path {
      fill: red;
    }
  }
`

const Title = styled.div`
  position: absolute;
  top: -2rem;
  font-family: 'Mitr', cursive;
  text-transform: uppercase;
  color: red;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 1rem;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin-bottom: 1em;

  @media only screen and (max-device-width: 480px) {
    width: 100%;
  }
`

const PlayStateContainer = styled.div`
  display: flex;
`

const PlayPositionContainer = styled.div`
  display: flex;
  justify-self: flex-end;
`

const Duration = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
  background: #222;
  transition: all 200ms ease-in-out;
`

const DurationFill = styled.div`
  position: absolute;
  background: red;
  height: 100%;
  width: 0%;
  transition: width 200ms ease-in-out;
`

const DurationContainer = styled.div`
  position: absolute;
  cursor: pointer;
  height: 30px;
  width: 200px;
  top: 100%;

  @media only screen and (max-device-width: 480px) {
    width: 100%;
  }

  &:hover {
    ${Duration} {
      height: 10px;
    }

    ${DurationFill} {
      background: red;
    }
  }
`

interface Props {
  items: {
    title: string
    audio: any
  }[]
}

export default function Audio(props: Props) {
  const { items } = props
  const [{ current, play, pause, duration }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const audioRef = useRef<HTMLDivElement>(null)
  const durationRef = useRef<HTMLDivElement>(null)

  // save audioRef with closure
  const getSong = getSongWithRef(audioRef)

  function onTimeUpdate(event: React.ChangeEvent<HTMLAudioElement>) {
    const { currentTime, duration } = event.target
    dispatch({ type: Actions.DURATION, payload: currentTime })

    if (currentTime === duration) {
      if (!!items[current + 1]) {
        onNextSong()
      } else {
        onStop()
      }
    }
  }

  function onNextSong() {
    dispatch({ type: Actions.STOP })

    const currentSong = getSong(current)
    currentSong.pause()
    currentSong.currentTime = 0

    dispatch({ type: Actions.NEXT })

    const nextSong = getSong(current + 1)
    nextSong.play()
  }

  function onPrevSong() {
    dispatch({ type: Actions.STOP })

    getSong(current).pause()
    getSong(current).currentTime = 0

    dispatch({ type: Actions.PREV })

    getSong(current - 1).play()
  }

  function onPlay() {
    dispatch({ type: Actions.PLAY, payload: current })
    getSong(current).play()
  }

  function onPause() {
    dispatch({ type: Actions.PAUSE })
    getSong(current).pause()
  }

  function onStop() {
    dispatch({ type: Actions.STOP })

    getSong(current).pause()
    getSong(current).currentTime = 0
  }

  function onDurationClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const songLength = getSong(current).duration
    const barWidth = getWidth(durationRef)
    const clicked = event.nativeEvent.offsetX

    const x = (clicked / barWidth) * songLength

    dispatch({ type: Actions.DURATION, payload: x })
    getSong(current).currentTime = x
  }

  const songLength = getSong(current).duration
  const barWidth = getWidth(durationRef)
  const seconds = Math.floor(duration)
  const songTime = {
    minutes: Math.round(Math.floor(songLength) / 60),
    seconds: Math.floor(songLength) % 60,
  }

  console.log('songLength', songTime.minutes, songTime.seconds, seconds)

  const style = {
    width: `${barWidth * (duration / songLength)}px`,
  }

  return (
    <AudioPlayer>
      <Title>{!play || pause ? 'play' : items[current].title}</Title>
      <IconContainer>
        <PlayStateContainer>
          {play ? <Pause onClick={onPause} /> : <Play onClick={onPlay} />}
          <AnimatePresence>
            {(play || pause) && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Stop onClick={onStop} />
              </motion.div>
            )}
          </AnimatePresence>
        </PlayStateContainer>

        <AnimatePresence>
          {(play || pause) && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PlayPositionContainer>
                <Prev visible={!!items[current - 1]} onClick={onPrevSong} />
                <Next visible={!!items[current + 1]} onClick={onNextSong} />
              </PlayPositionContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </IconContainer>
      <AnimatePresence>
        {(play || pause) && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DurationContainer onClick={onDurationClick} ref={durationRef}>
              <Duration>
                <DurationFill style={{ ...style }} />
              </Duration>
            </DurationContainer>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={audioRef}>
        {items.map((item, index) => (
          <audio key={index} preload="true" onTimeUpdate={onTimeUpdate}>
            <source key={index} src={item.audio} />
          </audio>
        ))}
      </div>
    </AudioPlayer>
  )
}

function getWidth(element: React.RefObject<HTMLDivElement>) {
  if (element && element.current) {
    return element.current.clientWidth
  }

  return 0
}

type songObjectType = {
  play: () => void
  pause: () => void
  currentTime: number
  duration: number
}

type songRefType = HTMLAudioElement | songObjectType

function getSongWithRef(ref: React.RefObject<HTMLDivElement>) {
  return function (song: number): songRefType {
    if (ref && ref.current) {
      return ref.current.children[song] as HTMLAudioElement
    }

    return {
      play: () => {},
      pause: () => {},
      currentTime: 0,
      duration: 0,
    }
  }
}

const Stop = ({ onClick }: { onClick: any }) => (
  <div onClick={onClick} className="audio-element">
    <svg
      width="27px"
      height="27px"
      viewBox="0 0 27 27"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Desktop-HD"
          transform="translate(-1139.000000, -395.000000)"
          fill="#FF6450"
        >
          <rect
            id="Rectangle-2"
            x="1139"
            y="395"
            width="27"
            height="27"
            rx="2"
          />
        </g>
      </g>
    </svg>
  </div>
)

const IconWrapper = styled.div<{ hidden?: boolean }>`
  width: 30px;
  margin-right: 0.5rem;
  transition: all 200ms ease-in-out;
  opacity: ${(props) => (!props.hidden ? 1 : 0.2)};
  pointer-events: ${(props) => (!props.hidden ? 'auto' : 'none')};

  svg {
    path,
    g {
      fill: red;
      transition: all 100ms ease-in-out;

      &:hover {
        fill: red;
      }
    }
  }
`

const Play = ({ onClick }: { onClick: any }) => (
  <IconWrapper onClick={onClick}>
    <svg
      width="23px"
      height="28px"
      viewBox="0 0 23 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Desktop-HD"
          transform="translate(-1054.000000, -395.000000)"
          fill="#FF6450"
          fillRule="nonzero"
        >
          <g id="Orion_play" transform="translate(1054.000000, 395.000000)">
            <path
              d="M0,2 C0,0.9 0.777,0.454 1.727,1.008 L22.273,12.992 C22.7003157,13.1428938 22.9860548,13.5468249 22.9860548,14 C22.9860548,14.4531751 22.7003157,14.8571062 22.273,15.008 L1.728,26.992 C0.777,27.546 0,27.1 0,26 L0,2 Z"
              id="Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
)

const Pause = ({ onClick }: { onClick: any }) => (
  <IconWrapper onClick={onClick}>
    <svg
      width="19px"
      height="28px"
      viewBox="0 0 19 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Desktop-HD"
          transform="translate(-1097.000000, -395.000000)"
          fill="#FF6450"
          fillRule="nonzero"
        >
          <g id="pause-button" transform="translate(1097.000000, 395.000000)">
            <path
              d="M8,26.9909966 C8,27.5481965 7.52243178,28 6.93333333,28 L1.06666667,28 C0.477568221,28 0,27.5482488 0,26.9909966 L0,1.00900336 C0,0.451751192 0.477568221,0 1.06666667,0 L6.93333333,0 C7.52243178,0 8,0.451751192 8,1.00900336 L8,26.9909966 Z"
              id="Shape"
            />
            <path
              d="M19,26.9909966 C19,27.5481965 18.5224318,28 17.9333333,28 L12.0666667,28 C11.4775682,28 11,27.5482488 11,26.9909966 L11,1.00900336 C11,0.451751192 11.4775682,0 12.0666667,0 L17.9333333,0 C18.5224318,0 19,0.451751192 19,1.00900336 L19,26.9909966 Z"
              id="Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
)

const Next = ({ onClick, visible }: { onClick: any; visible: boolean }) => {
  return (
    <IconWrapper hidden={!visible} onClick={onClick}>
      <svg
        width="23px"
        height="20px"
        viewBox="0 0 23 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs />
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Desktop-HD"
            transform="translate(-1247.000000, -399.000000)"
            fill="#FFFFFF"
            fillRule="nonzero"
          >
            <g id="Group" transform="translate(1247.000000, 399.000000)">
              <g id="Orion_play-Copy">
                <path
                  d="M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z"
                  id="Shape"
                />
              </g>
              <g
                id="Orion_play-Copy-2"
                transform="translate(8.000000, 0.000000)"
              >
                <path
                  d="M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z"
                  id="Shape"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </IconWrapper>
  )
}

const Prev = ({ onClick, visible }: { onClick: any; visible: boolean }) => {
  return (
    <IconWrapper hidden={!visible} onClick={onClick}>
      <svg
        width="23px"
        height="20px"
        viewBox="0 0 23 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs />
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Desktop-HD"
            transform="translate(-1204.000000, -399.000000)"
            fill="#FFFFFF"
            fillRule="nonzero"
          >
            <g
              id="Group"
              transform="translate(1215.500000, 409.000000) rotate(-180.000000) translate(-1215.500000, -409.000000) translate(1204.000000, 399.000000)"
            >
              <g id="Orion_play-Copy">
                <path
                  d="M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z"
                  id="Shape"
                />
              </g>
              <g
                id="Orion_play-Copy-2"
                transform="translate(8.000000, 0.000000)"
              >
                <path
                  d="M0,1.42857143 C0,0.642857143 0.50673913,0.324285714 1.12630435,0.72 L14.5258696,9.28 C14.8045537,9.38778131 14.9909053,9.6763035 14.9909053,10 C14.9909053,10.3236965 14.8045537,10.6122187 14.5258696,10.72 L1.12695652,19.28 C0.50673913,19.6757143 0,19.3571429 0,18.5714286 L0,1.42857143 Z"
                  id="Shape"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </IconWrapper>
  )
}
