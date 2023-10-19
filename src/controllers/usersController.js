let db = require("../database/models");

const {getLoginProcess, getGuardarUser, getEditarUser, getActualizarUser,
getBorrarUser,getLogout, getMisProductos} = require('../services/userService');
const { get } = require("http");

let usersController = {
  profile: function (req, res) {
    res.render("./pages/profile", {
      user: req.session.userLogged,
    });
  },
  login: function (req, res) {
    res.render("./pages/login");
  },
  loginProcess: async (req, res) => {
    getLoginProcess(req,res);
  },
  register: function (req, res) {
    res.render("./pages/register");
  },
  guardarUser: async function (req, res) {
    getGuardarUser(req,res);
  },
  editarUser: function (req, res) {
    getEditarUser(req,res);
  },
  actualizarUser: async function (req, res) {
    getActualizarUser(req,res);
  },
borrarUser: async function (req, res) {
  getBorrarUser(req,res);
  },
  logout: function (req, res) {
    getLogout(req,res);
  },
  misProductos: function (req, res) {
    getMisProductos(req,res);
  },

  // APIs //

  unUsuario: (req, res) => {
    db.Usuario.findByPk(req.params.id)
      .then((usuario) => {
        return res.json({ 
          nombre: usuario.nombreCompleto,
          email: usuario.email,
          avatar: usuario.imagen,
          status: 200
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  todosLosUsuarios: (req, res) => {
    db.Usuario.findAll()
      .then((usuarios) => {
        return res.json({ 
          total: usuarios.length,
          data: usuarios,
          status: 200
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  }
};

module.exports = usersController;