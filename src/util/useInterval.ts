import { useEffect, useRef } from "react"

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<Function | null>(null)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === "function") {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
