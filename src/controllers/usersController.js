const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

let db = require ('../../database/models')

// credenciales Cloudinary 
cloudinary.config({ 
	cloud_name: 'dlf8flk1o', 
	api_key: '829857512934227', 
	api_secret: 'iTQRHKw1LiAeUUeO8jrfx3d_MVg' 
});

let usersController = {
  profile: function (req, res) 
  {
    // VERIFICAR SI ESTÁ OK - MIDDLEWARES
    
    // res.render('./pages/profile', {
		// 	user: req.session.userLogged
		// });
  },
  register: function (req, res) 
  {
		res.render('./pages/register');
  },
  guardarUser: async function (req, res)
  {
    try{
    // const resultValidation = validationResult(req)
    // if (resultValidation.errors.length > 0){
    //     return res.render('./pages/register', {
    //         errors: resultValidation.mapped(),
    //         oldData: req.body
    //     })
    // }
    // let userInDB = User.findByField('email', req.body.email)
    // if (userInDB) {
    //     return res.render('./pages/register', {
    //         errors: {
    //             email: {
    //                 msg: 'El email que desea ingresar ya está registrado.'
    //             }
    //         },
    //         oldData: req.body
    //     });
    // }
    // console.log(req.file.buffer);
    const imageBufferAvatar = req.file.buffer;
    // console.log(req.file);
    const customFilenameAvatar = Date.now() + 'imagen';
    const folderName = 'avatars';
    
    const uploadPromiseAvatar = new Promise((resolve, reject) => {
      let streamAvatar = cloudinary.uploader.upload_stream({folder: folderName, resource_type: 'image', public_id: customFilenameAvatar}, (error, result) => {
        if (error) {
          console.error('Error during upload:', error);
          reject(error);
        } else {
          console.log('Upload successful:', result);
          resolve(result);
        }
      });
        streamifier.createReadStream(imageBufferAvatar).pipe(streamAvatar);
      });
        const uploadedImageAvatar = await uploadPromiseAvatar;
            
    db.Usuario.create({
      nombreCompleto: req.body.nombreCompleto,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      imagen: customFilenameAvatar 
      })
        res.redirect("/users/login")
      } catch (error) {
        console.error('Error:', error);
      }
  },
  login: function (req, res) 
  {
    res.render('./pages/login');
  },
  loginProcess: async (req, res) => {

    //PREGUNTAR POR: USER LOGGED MIDDLEWARE

    try {
        const { email, password } = req.body;
        const user = await db.Usuario.findOne({
            where: {email}
        });
        if (!user) {
            return res.status(404).json('Email no encontrado');
        }
        // Verifica password
        const passwordValid = await bcrypt.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(404).json('Combinación de email y password incorrecta');
        }
      } catch (err) {
        return res.status(500).send('Error');
    }
	},
  logout: function (req, res)
	{ 
    // VERIFICAR SI ESTÁ OK - MIDDLEWARES

		// res.clearCookie('userEmailCookie');
		// req.session.destroy();
		// return res.redirect ('/')
	},
}

module.exports = usersController;