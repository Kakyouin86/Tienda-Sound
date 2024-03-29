const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { validationResult } = require("express-validator");
let db = require("../database/models");

let customFilenameAvatar;

// Credenciales Cloudinary
cloudinary.config({
  cloud_name: "dlf8flk1o",
  api_key: "829857512934227",
  api_secret: "iTQRHKw1LiAeUUeO8jrfx3d_MVg",
});


async function getLoginProcess(req,res){
    try {
        // Validación Back End - Login
        const { email, password, recordarUsuario } = req.body;
        const user = await db.Usuario.findOne({
          where: { email },
        });
  
        if (!user) {
          return res.render("./pages/login", {
            errors: {
              email: {
                msg: "Este email no se encuentra en nuestra base de datos.",
              },
            },
          });
        }
  
        const passwordValid = await bcrypt.compare(password, user.password);
  
        if (!passwordValid) {
          return res.render("./pages/login", {
            errors: {
              password: {
                msg: "La contraseña es incorrecta.",
              },
            },
          });
        } else {
          delete user.password; // Elimina la contraseña antes de almacenar en la sesión
          req.session.userLogged = user; // Almacena el usuario en la sesión
  
          if (recordarUsuario) {
            res.cookie("userEmailCookie", email, { maxAge: 600000 });
          }
  
          return res.redirect("/users/profile");
        }
      } catch (err) {
        console.error(err);
        return res.status(500).send("Error en el servidor");
      }

}

async function getGuardarUser(req,res){
    try {
        // Validación Back End - Register
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
          return res.render("./pages/register", {
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        }
  
        const { email, password, recordarUsuario } = req.body;
        let userInDB = await db.Usuario.findOne({
          where: { email },
        });
  
        if (userInDB) {
          return res.render("./pages/register", {
            errors: {
              email: {
                msg: "El email que desea ingresar ya está registrado.",
              },
            },
            oldData: req.body,
          });
        }
  
        if (!req.file) {
          customFilenameAvatar = "1693612817788imagen"; // IMAGEN POR DEFECTO cuando no se carga una imagen
        } else {
          const imageBufferAvatar = req.file.buffer;
          customFilenameAvatar = Date.now() + "imagen";
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
        }
  
        await db.Usuario.create({
          nombreCompleto: req.body.nombreCompleto,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          imagen: customFilenameAvatar,
        });
  
        res.redirect("/users/login");
      } catch (error) {
        console.error("Error:", error);
      }
}

function getEditarUser(req,res){
    let pedidoUsuario = db.Usuario.findByPk(req.params.id);
    pedidoUsuario
      .then(function (user) {
        res.render("./pages/editarUser", { user: user });
      })
      .catch(function (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send("Error al obtener el usuario");
      });
}

async function getActualizarUser(req,res){
    try {
        // Validación Back End - Editar Usuario
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
          let pedidoUsuario = db.Usuario.findByPk(req.params.id);
          pedidoUsuario
          .then(function (user){
          return res.render("./pages/editarUser", {errors: resultValidation.mapped(), user: user}) })
          
        } else {
        
        let customFilenameAvatar; // nombre de la imagen definida en la variable, en CREATE
      
        if (req.file) {
          const imageBufferAvatar = req.file.buffer;
          fileNameUpdateAvatar = Date.now() + "imagen";
          const folderName = "avatars";
  
          const uploadPromiseAvatar = new Promise((resolve, reject) => {
            let streamAvatar = cloudinary.uploader.upload_stream(
              {
                folder: folderName,
                resource_type: "image",
                public_id: fileNameUpdateAvatar,
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
        }
        await db.Usuario.update(
          {
            nombreCompleto: req.body.nombreCompleto,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            imagen: req.file ? fileNameUpdateAvatar : customFilenameAvatar,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
  
        let actualizarUsuario = await db.Usuario.findOne({
          where: { id: req.params.id },
        });
  
        req.session.userLogged = actualizarUsuario;
        res.redirect("/users/profile");
      }
      
      } catch (error) {
        console.error("Error:", error);
      }
}

async function getBorrarUser(req,res){
    try {
        // Step 1: Fetch all products associated with the user
        const userProducts = await db.Producto.findAll({
          where: {
            usuario_id: req.params.id, // Assuming 'usuario_id' is the foreign key in the 'Producto' table
          },
        });
        // Step 2: Delete all associated products
        for (const product of userProducts) {
          await product.destroy();
        }
        // Step 3: After all products are deleted, delete the user
        await db.Usuario.destroy({
          where: {
            id: req.params.id,
          },
        });
        // Additional cleanup
        res.clearCookie("userEmailCookie");
        req.session.destroy();
        res.redirect("/");
      } catch (error) {
        console.error("Error:", error);
      }
}

function getLogout(req,res){
    res.clearCookie("userEmailCookie");
    req.session.destroy();
    return res.redirect("/");
}

function getMisProductos(req,res){
    db.Producto.findAll({ where: { usuario_id: req.session.userLogged.id } })
      .then(function (products) {
        res.render("./pages/misProductos", {
          user: req.session.userLogged,
          productos: products,
        });
      });
}

module.exports = {
    getLoginProcess,
    getGuardarUser,
    getEditarUser,
    getActualizarUser,
    getBorrarUser,
    getLogout,
    getMisProductos
}