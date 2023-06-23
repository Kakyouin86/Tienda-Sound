let mainController = {
    index: function(req,res){
        res.render('./pages/home');
    },
    login: function(req,res){
        res.render('./pages/login');
    },
    register: function(req,res){
        res.render('./pages/register');
    },
    producto: function(req,res){
        res.render('./pages/producto');
    },
    carrito: function(req,res){
        res.render('./pages/carrito');
    }




}

module.exports = mainController;