import React, { useState } from 'react'

import { Loader, Photo, Modal } from '../../components'

import { useFetch, mapPhotoData } from '../../util'

export default function Media() {
  const [current, setCurrent] = useState({ id: null, visible: false })

  const photos = useFetch(
    `https://api.instagram.com/v1/users/self/media/recent/?access_token=${
      process.env.REACT_APP_INSTAGRAM_KEY
    }`
  )

  function handleClick(id) {
    setCurrent({ id, visible: true })
  }

  function handleClose() {
    setCurrent(e => ({ ...e, visible: false }))
  }

  if (!photos) {
    return <Loader />
  }

  if (photos.data && photos.data.length > 0) {
    const foundCurrentImage = photos.data.find(x => x.id === current.id)
    const currentImage = foundCurrentImage
      ? foundCurrentImage.images.standard_resolution
      : {}
    return (
      <div>
        {photos.data.map((photo, index) => {
          const data = mapPhotoData(photo)

          return <Photo onClick={handleClick} key={index} {...data} />
        })}
        <Modal onClose={handleClose} isOpen={current.visible}>
          <img
            src={currentImage.url}
            width={currentImage.width}
            height={currentImage.height}
            alt='Instagram'
          />
        </Modal>
      </div>
    )
  }

  return 'Photos konnten nicht geladen werden. Versuche es später nochmal.'
}
