module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(55),
            allowNull: false
        }
    };
    let config = {
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config)

    //Asociamos el modelo Categorias con el modelo productos.

    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as:"product",
            foreignKey:"id_category"
        });
    }

    return Category
}