module.exports = (sequelize, dataTypes) => {
    let alias = 'UserType';
    let cols = {
        type: {
            type: dataTypes.TINYINT,
            primaryKey: true,
            allowNull: false
        }
    };
    let config = {
        tableName: 'UserTypes',
        timestamps: false
    };
    const UserType = sequelize.define(alias, cols, config)

    return UserType
}