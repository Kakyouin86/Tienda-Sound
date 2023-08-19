

module.exports = function(sequelize, DataTypes){

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

    Categoria.associate = function(modelos){
        
        Categoria.hasMany(modelos.Producto,
            {
                as: "Producto",
                foreignKey: "categoria_id",
        });
    }

    return Categoria;

}