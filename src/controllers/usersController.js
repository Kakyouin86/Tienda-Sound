const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

let db = require("../../database/models");

// credenciales Cloudinary
cloudinary.config({
  cloud_name: "dlf8flk1o",
  api_key: "829857512934227",
  api_secret: "iTQRHKw1LiAeUUeO8jrfx3d_MVg",
});

let usersController = {
  profile: function (req, res) {
    res.render("./pages/profile", {
      user: req.session.userLogged,
    });
  },
  register: function (req, res) {
    res.render("./pages/register");
  },
  guardarUser: async function (req, res) {
    try {
      const imageBufferAvatar = req.file.buffer;
      const customFilenameAvatar = Date.now() + "imagen";
      const folderName = "avatars";

      const uploadPromiseAvatar = new Promise((resolve, reject) => {
        let streamAvatar = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            resource_type: "image",
            public_id: customFilenameAvatar,
          },
          (error, result) => {
            if (error) {
              console.error("Error during upload:", error);
              reject(error);
            } else {
              console.log("Upload successful:", result);
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(imageBufferAvatar).pipe(streamAvatar);
      });
      const uploadedImageAvatar = await uploadPromiseAvatar;

      db.Usuario.create({
        nombreCompleto: req.body.nombreCompleto,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        imagen: customFilenameAvatar,
      });
      res.redirect("/users/login");
    } catch (error) {
      console.error("Error:", error);
    }
  },
  editarUser: function (req, res) {
    let pedidoUsuario = db.Usuario.findByPk(req.params.id);
    pedidoUsuario
      .then(function (user) {
        res.render('./pages/editarUser', { user: user });
      })
      .catch(function (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).send('Error al obtener el usuario');
      });
  },
  actualizarUser: async function (req, res) {
    try {
      const imageBufferAvatar = req.file.buffer;
      console.log(req.file);
      console.log(imageBufferAvatar);
      const customFilenameAvatar = Date.now() + "imagen";
      const folderName = "avatars";

      const uploadPromiseAvatar = new Promise((resolve, reject) => {
        let streamAvatar = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            resource_type: "image",
            public_id: customFilenameAvatar,
          },
          (error, result) => {
            if (error) {
              console.error("Error during upload:", error);
              reject(error);
            } else {
              console.log("Upload successful:", result);
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(imageBufferAvatar).pipe(streamAvatar);
      });
      const uploadedImageAvatar = await uploadPromiseAvatar;

      db.Usuario.update({
        nombreCompleto: req.body.nombreCompleto,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        imagen: customFilenameAvatar,
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );
      res.redirect("/users/login");
    } catch (error) {
      console.error("Error:", error);
    }
  },
  borrarUser: function (req, res){
    db.Usuario.destroy({
        where: {
          id: req.params.id
        }
      });
      res.redirect('/login');
  },
  login: function (req, res) {
    res.render("./pages/login");
  },
  loginProcess: async (req, res) => {
    try {
      const { email, password, recordarUsuario } = req.body;
      const user = await db.Usuario.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(404).json("Email no encontrado");
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        return res
          .status(401)
          .json("Combinación de email y contraseña incorrecta");
      } else {
        delete user.password; // Elimina la contraseña antes de almacenar en la sesión
        req.session.userLogged = user; // Almacena el usuario en la sesión

        if (recordarUsuario) {
          res.cookie("userEmailCookie", email, { maxAge: 6000 });
        }

        return res.redirect("/users/profile");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error en el servidor");
    }
  },

  logout: function (req, res) {
    res.clearCookie("userEmailCookie");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
