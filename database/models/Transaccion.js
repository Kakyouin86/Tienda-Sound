

function transaccionData (sequelize, DataTypes){

    let alias = "Transaccion";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_de_transaccion:{
            type: DataTypes.DATE,
            allowNull: false
        },
        medios_pago:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        nombre_comprador:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dni:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        direccion:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        telefono:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        monto:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        producto_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ciudad_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "Transaccion",
        timestamps: false
    }

    let Transaccion = sequelize.define(alias, cols, config);

    Transaccion.associate = function(modelos){
        
        Transaccion.belongsTo(modelos.Producto,
            {
                as: "Producto",
                foreignKey: "producto_id",
        });

        Transaccion.belongsTo(modelos.Ciudad,
            {
                as: "Ciudad",
                foreignKey: "ciudad_id",
        });
    }

    return Transaccion;

}

module.exports = transaccionData;