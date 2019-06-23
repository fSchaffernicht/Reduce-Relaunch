import { useState, useEffect } from 'react'

import { throttle } from 'lodash'

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export default function useWindowSize() {
  const [state, setState] = useState(getSize)

  function handleResize(e) {
    setState(getSize)
  }

  useEffect(() => {
    const throttled = throttle(handleResize, 200)
    window.addEventListener('resize', throttled)

    return () => window.removeEventListener('resize', throttled)
  }, [])

  return state
}
