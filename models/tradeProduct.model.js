module.exports = (sequelize, DataTypes) => {
    const TradeProduct = sequelize.define('trade_product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        messageId:{
            type:DataTypes.STRING 
        },
        isConfirmed:{
            type:DataTypes.BOOLEAN
        }
    },{
        underscored:true
    })
    return TradeProduct
}