import multer from 'multer'

const storage = multer.memoryStorage()

const uploader = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
    } else {
      cb(new Error('Only images are allowed'))
    }
  },
})

export default uploader
