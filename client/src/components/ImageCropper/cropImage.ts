import { IcroppedAreaPixels } from './ImageCropper'

const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

const getCroppedImg = async (imageSrc: string, crop: IcroppedAreaPixels) => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  /* setting canvas width & height allows us to
    resize from the original image resolution */
  canvas.width = 250
  canvas.height = 250

  ctx!.beginPath()
  ctx!.arc(125, 125, 125, 0, 2 * Math.PI)
  ctx!.closePath()
  ctx!.fill()
  ctx!.clip()
  ctx!.stroke()

  ctx!.drawImage(
    image as HTMLImageElement,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, 'image/jpeg')
  })
}

export default getCroppedImg
