module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
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
        lastName: {
            type: dataTypes.STRING(55),
            allowNull: false
        },
        dni: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        bDate: {
            type: dataTypes.DATE,
            allowNull: false
        },
       
        phone: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        avatar: {
            type: dataTypes.BLOB,
            default: '../images/users/default.png'
        },
       
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false

        },
        userType: {
            type: dataTypes.TINYINT,
            foreignKey: true,
            allowNull: false
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    return User
}