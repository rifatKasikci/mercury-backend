module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName:{
            type:DataTypes.STRING
        },
        lastName:{
            type:DataTypes.STRING
        },
        userName:{
            type:DataTypes.STRING
        },
        identityNumber:{
            type:DataTypes.STRING
        },
        phoneNumber:{
            type:DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
        },
        emailConfirmed: {
            type:DataTypes.BOOLEAN
        },
        passwordHash: {
            type: DataTypes.STRING,
        },
        gender:{
            type:DataTypes.BOOLEAN
        }
    },{
        underscored:true
    })
    return User
}
