import { css } from '@emotion/react'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Button,
} from '@chakra-ui/react'

interface props {
  getBlob: (blob: any) => void
  inputImg: ArrayBuffer | string
  setIsCropping: (isCoping: boolean) => void
  setFinalImage: (image: any) => void
}

export interface IcroppedAreaPixels {
  width: number
  height: number
  x: number
  y: number
}

const ImageCropper: React.FC<props> = ({
  getBlob,
  inputImg,
  setIsCropping,
  setFinalImage,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  /* onCropComplete() will occur each time the user modifies the cropped area,
    which isn't ideal. A better implementation would be getting the blob
    only when the user hits the submit button, but this works for now  */
  const onCropComplete = async (
    _: any,
    croppedAreaPixels: IcroppedAreaPixels
  ) => {
    const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels)
    getBlob(croppedImage as Blob)
    setFinalImage(URL.createObjectURL(croppedImage) as string)
  }

  return (
    <>
      <div
        css={css`
          position: relative;
          width: 60%;
          height: 30rem;
          margin: auto;
          background-color: rgb(26, 32, 44);
          margin-top: 5rem;
        `}
      >
        <Cropper
          image={inputImg as string}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape='round'
          showGrid={false}
        />
      </div>
      <Flex flexDirection='column' mt={4}>
        <Slider
          margin='auto'
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-label='slider-ex-1'
          defaultValue={30}
          onChange={(value) => setZoom(value)}
          width='60%'
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button
          onClick={() => setIsCropping(false)}
          colorScheme='blue'
          variant='outline'
          width='60%'
          mx='auto'
          mt={4}
        >
          Add
        </Button>
      </Flex>
    </>
  )
}

export default ImageCropper
