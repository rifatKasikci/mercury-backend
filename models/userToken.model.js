module.exports = (sequelize, DataTypes) => {
    const UserToken = sequelize.define('userToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        expirationDate: {
            type: DataTypes.DATE
        }
    },{
        underscored:true
    })

    return UserToken
}
