import { v2 as cloudinary } from 'cloudinary'
import options from '../config'

cloudinary.config({
  cloud_name: options.cloudName,
  api_key: options.cloudApiKey,
  api_secret: options.cloudApiSecret,
})

export const uploadPicture = (
  image: Buffer,
  login: string
): Promise<object> => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'chat_app_avatars',
      use_filename: true,
      public_id: login,
      format: 'jpg',
      eager: [{ width: 200, height: 200, crop: 'scale' }],
    }

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error)
        else resolve(result as object)
      })
      .end(image)
  })
}

export default cloudinary
