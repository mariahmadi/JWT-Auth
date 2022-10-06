const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).include('jpeg') || (file.mimetype).include('png') || (file.mimetype).include('jpg')) { cb(null, true) }
    else { cb(null, false) }
}

const upload = multer({ storage: storage,fileFilter :fileFilter })

module.exports = upload.single('Image')