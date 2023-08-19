const { DataTypes } = require("sequelize");

function productoData(sequelize, dataTypes){

    let alias = "Producto";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreProducto:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        descripcionProductoCorta:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        precioProducto:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        estadoProducto:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        descripcionProductoLarga:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: true // recordar que es "false" - consultar con profes
        },
        fecha_alta:{
            type: DataTypes.DATE,
            allowNull: true // recordar que es "false" - consultar con profes 
        },
        fecha_modificacion:{
            type: DataTypes.DATE,
            allowNull:  true // recordar que es "false" - consultar con profes
        },
        fecha_baja:{
            type: DataTypes.DATE,
            allowNull: true // recordar que es "false" - consultar con profes
        },
        imagen:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        categoria_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: true // recordar que es "false" - consultar con profes
        },
        marca_id:{
            type: DataTypes.INTEGER,
            allowNull: true // recordar que es "false" - consultar con profes
        },
        puntuacion_id:{
            type: DataTypes.INTEGER,
            allowNull: true // recordar que es "false" - consultar con profes
        }
    };

    let config = {
        tableName: "Producto",
        timestamps: false
    }

    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(modelos){
        
        Producto.belongsTo(modelos.Usuario,
            {
                as: "Usuario",
                foreignKey: "usuario_id",
        });

        Producto.belongsTo(modelos.Categoria,
            {
                as: "Categoria",
                foreignKey: "categoria_id",
        });

        Producto.belongsTo(modelos.Marca,
            {
                as: "Marca",
                foreignKey: "marca_id",
        });

        Producto.belongsTo(modelos.Puntuacion,
            {
                as: "Puntuacion",
                foreignKey: "puntuacion_id",
        });
    }
    
    return Producto;
}

module.exports = productoData;