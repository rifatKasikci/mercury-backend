module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('refreshToken',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        token:{
            type:DataTypes.STRING
        },
        expirationDate:{
            type:DataTypes.DATE
        }
    },{
        underscored:true
    })
    return RefreshToken
}
