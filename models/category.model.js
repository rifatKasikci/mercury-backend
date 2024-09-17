module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
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
    return Category
}