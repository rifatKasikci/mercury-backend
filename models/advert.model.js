module.exports = (sequelize, DataTypes) => {
    const Advert = sequelize.define('advert', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        completionTimeOfRequestedService:{
            type:DataTypes.INTEGER
        },
        completionTimeOfProvidedService:{
            type:DataTypes.INTEGER
        },
        minRevisionCount:{
            type:DataTypes.INTEGER
        },
        maxRevisionCount:{
            type:DataTypes.INTEGER
        },
        revisionCountOfProvidedService:{
            type:DataTypes.INTEGER
        },
        revisionCountOfRequestedService:{
            type:DataTypes.INTEGER
        },
        isMatchedUserConfirmed:{
            type:DataTypes.BOOLEAN
        },
        isRequestedServiceSended:{
            type:DataTypes.BOOLEAN
        },
        isProvidedServiceSended:{
            type:DataTypes.BOOLEAN
        },
        tradeStatus:{
            type:DataTypes.STRING
        }
    },{
        underscored:true
    })
    return Advert
}