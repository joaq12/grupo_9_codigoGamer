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
        dicountApply: {
            type: dataTypes.TINYINT,

        },
        id_Category: {
            type: dataTypes.DATE,
            foreignKey: true,
            allowNull: false
        },
        id_Stock: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING,
            foreignKey: true,
            allowNull: false
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)

    return Product
}