const { DataTypes } = require("sequelize");

module.exports = function(sequelize, dataTypes){

    let alias = "Ciudad";
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
        tableName: "Ciudad",
        timestamps: false
    }

    let Ciudad = sequelize.define(alias, cols, config);
    return Ciudad;

}