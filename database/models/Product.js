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
        photo1: {
            type: dataTypes.STRING,
            default: '../images/1654344377821.jpeg'
        },
        photo2: {
            type: dataTypes.STRING,
            default: '../images/1654344377821.jpeg'
        },
        photo3: {
            type: dataTypes.STRING,
            default: '../images/1654344377821.jpeg'
        },
       
        description: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        shipping: {
            type: dataTypes.TINYINT,
        },
        discount: {
            type: dataTypes.TINYINT,
            default:0
        },
        discountAply: {
            type: dataTypes.SMALLINT,
        },

        id_category: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
       
        stock: {
            type: dataTypes.SMALLINT
        }
    };
    let config = {
        tableName: 'product',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)
    
    //Asociamos el modelo productos con los modelos Categorias y Stock.

     Product.associate = function(models){
         Product.belongsTo(models.Category,{
             as:"category",
             foreignKey:"id_category"
         });
        
     }

    return Product
}