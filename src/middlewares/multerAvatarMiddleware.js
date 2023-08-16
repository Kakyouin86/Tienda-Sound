/*

const path = require('path');
const multer = require('multer');

// Configuración del almacenamiento de multer - PROFILE

const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, path.join(__dirname, '../../public/img/avatars'));
    },
    filename: function (req, file, cb)
    {
        let imageName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, imageName);
    },
});

// Validación de imagenes MIMETYPES - PROFILE

const fileFilterAvatar = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg') || (file.mimetype).includes('gif')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const uploadAvatar = multer({ storage: storageAvatar, fileFilter: fileFilterAvatar});

module.exports = uploadAvatar;

*/