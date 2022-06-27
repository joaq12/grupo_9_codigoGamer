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
        tableName: 'stocks',
        timestamps: false
    };
    const Stock = sequelize.define(alias, cols, config)

    return Stock
}