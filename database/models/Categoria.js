const { DataTypes } = require("sequelize");

module.exports = function(sequelize, dataTypes){

    let alias = "Categoria";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(255),
            allowNull: false
        }
    };

    let config = {
        tableName: "Categoria",
        timestamps: false
    }

    let Categoria = sequelize.define(alias, cols, config);
    return Categoria;

}