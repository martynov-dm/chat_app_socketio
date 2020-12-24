import multer from 'multer'

const storage = multer.memoryStorage()

const uploader = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
})

export default uploader
