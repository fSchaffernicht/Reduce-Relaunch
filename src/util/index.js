import moment from 'moment'
import useFetch from './useFetch'

export function mapPhotoData({ comments, images, likes, id }) {
  return {
    comments,
    id,
    img: images.low_resolution,
    likes: likes.count
  }
}

export function mapVideoData(data) {
  return {
    videoId: data.id.videoId,
    title: data.snippet.title,
    description: data.snippet.description,
    date: moment(data.snippet.publishedAt).format('DD.MM.YYYY'),
    thumbnails: data.snippet.thumbnails
  }
}

export function filterVideos(videos) {
  return videos.filter(video => video.snippet.title !== 'Reduce')
}

export function classNames(classes) {
  let result = ''

  for (let className in classes) {
    if (classes[className]) {
      result += className + ' '
    }
  }

  return result.trim()
}

export { useFetch }
