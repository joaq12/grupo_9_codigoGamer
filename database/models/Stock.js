module.exports = (sequelize, dataTypes) => {
    let alias = 'Stock';
    let cols = {
        stock: {
            type: dataTypes.TINYINT,
            primaryKey: true,
            allowNull: false
        }
    };
    let config = {
     timestamps: false
    };
    let Stock = sequelize.define(alias, cols, config)
 
 //   Asociamos el modelo Stock con el modelo productos.

 Stock.associate = function(models){
    Stock.belongsTo(models.Product,{
        as:"producto",
        foreignKey:"stock_id"
    });
}
    return Stock
}