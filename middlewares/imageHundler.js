const multer = require("multer");
const appError = require('../utils/AppError')
const status = require('../utils/httpStatusText')



const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        const ext = file.mimetype.split('/')[1];
        const filename = `${file.originalname}-${Date.now()}.${ext}`
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb)=>{
    const isImage = file.mimetype.split('/')[0];
    if (isImage == "image") {
        return cb(null, true)
    }else{
        const error = appError.create("only images are allowed", 400, status[400])
        return cb(error, false)
    }
}
const upload = multer({ storage: storage, fileFilter});

module.exports = upload;