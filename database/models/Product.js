module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(55),
            allowNull: false
        },
        img1: {
            type: dataTypes.BLOB,
            default: '../images/1654344377821.jpeg'
        },
        img2: {
            type: dataTypes.BLOB,
            default: '../images/1654344377821.jpeg'
        },
        img3: {
            type: dataTypes.BLOB,
            default: '../images/1654344377821.jpeg'
        },
       
        description: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.SMALLINT,
            allowNull: false
        },
        shipping: {
            type: dataTypes.TINYINT,
            allowNull: false
        },
        discount: {
            type: dataTypes.TINYINT,
            allowNull: false

        },
        id_category: {
            type: dataTypes.SMALLINT,
            foreignKey: true,
            allowNull: false
        },
        id_Stock: {
            type: dataTypes.SMALLINT,
            foreignKey: true,
            allowNull: false
        }
    };
    let config = {
        tableName: 'product',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)
    
    //Asociamos el modelo productos con los modelos Categorias y Stock.

    Product.associate = function(models){
        Product.hasMany(models.Category,{
            as:"Category",
            foreignKey:"id_category"
        });
        Product.associate = function(models){
            Product.belongsTo(models.Stock,{
                as:"Product",
                foreignKey:"stock_id",
                timestamps: false
            });
        }
    }

    return Product
}