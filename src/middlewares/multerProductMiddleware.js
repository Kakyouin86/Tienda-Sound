const path = require('path');
const multer = require('multer');

// Configuración del almacenamiento de multer - PRODUCTOS

const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, path.join(__dirname, '../../public/img/productos'));
    },
    filename: function (req, file, cb)
    {
        let imageName = `${Date.now()}_img${path.extname(file.originalname)}`   // milisegundos y extensión de archivo original
        cb(null, imageName);
    },
});

// Validación de imagenes MIMETYPES - PRODUCTOS

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg') || (file.mimetype).includes('gif')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const uploadProduct = multer({ storage: storage, fileFilter: fileFilter});

module.exports = uploadProduct;