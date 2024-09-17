module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING
        }
    },{
        underscored:true
    })
    return Role
}