const { DataTypes } = require("sequelize");

module.exports = function(sequelize, dataTypes){

    let alias = "Puntuacion";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        puntaje:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "Puntuacion",
        timestamps: false
    }

    let Puntuacion = sequelize.define(alias, cols, config);
    return Puntuacion;

}