const { DataTypes } = require("sequelize");

module.exports = function(sequelize, dataTypes){

    let alias = "Usuario";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreCompleto:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        imagen:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        historial_compras:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        historial_ventas:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "Usuario",
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config);
    return Usuario;

}