module.exports= function(sequelize, DataTypes){

    let alias = "Producto";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreProducto:{
            type: DataTypes.STRING(255),
        },
        descripcionProductoCorta:{
            type: DataTypes.TEXT,
        },
        precioProducto:{
            type: DataTypes.FLOAT,
        },
        estadoProducto:{
            type: DataTypes.BOOLEAN,
        },
        descripcionProductoLarga:{
            type: DataTypes.TEXT,
        },
        stock:{
            type: DataTypes.INTEGER,
        },
        fecha_alta:{
            type: DataTypes.DATE,
        },
        fecha_modificacion:{
            type: DataTypes.DATE,
        },
        fecha_baja:{
            type: DataTypes.DATE,
        },
        imagen:{
            type: DataTypes.STRING(255),
        },
        categoria_id:{
            type: DataTypes.INTEGER,
        },
        usuario_id:{
            type: DataTypes.INTEGER,
        },
        marca_id:{
            type: DataTypes.INTEGER,
        },
        puntuacion_id:{
            type: DataTypes.INTEGER,
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
        Producto.hasMany(modelos.Transaccion,
            {
                as: "Transaccion",
                foreignKey: "producto_id",
        });  
    }
    
    return Producto;
}