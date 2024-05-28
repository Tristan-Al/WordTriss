import multer from 'multer'
import path from 'path'

// Set the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/avatars')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// Check file type
const checkFileType = (file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/

  // Check the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  // Check the mimetype
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images only!')
  }
}

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('avatar')

export default upload
