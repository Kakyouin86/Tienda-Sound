const {getIndex, searching} = require('../services/mainService');


let mainController = {
  index: function (req, res){
    getIndex(req,res);
  },
  carrito: function (req, res) {
    res.render("./pages/carrito");
  },
  search: async function (req, res) {
    await searching(req,res);
  },
};

module.exports = mainController;
