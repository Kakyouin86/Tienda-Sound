const fs = require('fs');
const path = require('path'); 

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
}

module.exports = mainController;