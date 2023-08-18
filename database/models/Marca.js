const { DataTypes } = require("sequelize");

module.exports = function(sequelize, dataTypes){

    let alias = "Marca";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        otro:{
            type: DataTypes.STRING(255),
            allowNull: false
        }
    };

    let config = {
        tableName: "Marca",
        timestamps: false
    }

    let Marca = sequelize.define(alias, cols, config);
    return Marca;

}