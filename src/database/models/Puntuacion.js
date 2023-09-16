module.exports = function(sequelize, DataTypes){

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

    Puntuacion.associate = function(modelos){
        
        Puntuacion.hasMany(modelos.Producto,
            {
                as: "Producto",
                foreignKey: "puntuacion_id",
        });
    }
    return Puntuacion;
}