import { useState, useEffect } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!data) {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          setData(result)
        })
        .catch(error => {
          console.log('Could not fetch data', error)
        })
    }
  })

  return data
}
