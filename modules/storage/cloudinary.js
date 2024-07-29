const multer = require('multer')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadManager = (destination) => {

   return multer({
        storage: new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: `ZillightLab/${destination}`,
            },
        }),
        fileFilter
    });
}

const videoManager = (destination) => {

   return multer({
        storage: new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: `ZillightLab/${destination}`,
                format: 'mp4',
                resource_type: 'video'
            },
        }),
        fileFilter
    });
}

function fileFilter(req, file, cb) {
    if (req.get('Authorization') !== undefined) {
        cb(null, true)
    } else {
        cb(null, true)
    }
}

module.exports = { uploadManager, videoManager }