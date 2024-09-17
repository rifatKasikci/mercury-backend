const dbConfig = require('../config/db.js');
const { Sequelize, DataTypes } = require('sequelize');
const { hashTextWithSalt } = require('../core/utils/hashHelper')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)
sequelize.authenticate()
    .then(() => {
        console.log('Connected to database...')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.model')(sequelize, DataTypes)
db.roles = require('./role.model')(sequelize, DataTypes)
db.verificationCodes = require('./verificationCode.model')(sequelize, DataTypes)
db.adverts = require('./advert.model')(sequelize, DataTypes)
db.categories = require('./category.model')(sequelize, DataTypes)
db.refreshTokens = require('./refreshToken.model.js')(sequelize, DataTypes)
db.userTokens = require('./userToken.model.js')(sequelize, DataTypes)
db.tradeProducts = require('./tradeProduct.model.js')(sequelize, DataTypes)
db.waitlistUsers = require('./waitlistUser.model.js')(sequelize, DataTypes)

// TradeProducts
db.tradeProducts.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
})
db.users.hasMany(db.tradeProducts, {
    foreignKey: 'userId',
    targetKey: 'id'
})
db.tradeProducts.belongsTo(db.adverts, {
    foreignKey: 'advertId',
    targetKey: 'id'
})
db.adverts.hasMany(db.tradeProducts, {
    foreignKey: 'advertId',
    targetKey: 'id'
})

//TradeProducts Ends

//UserTokens
db.userTokens.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
})
db.users.hasOne(db.userTokens, {
    foreignKey: 'userId',
    targetKey: 'id'
})
//UserTokens-End

//RefreshTokens
db.refreshTokens.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
})
db.users.hasOne(db.refreshTokens, {
    foreignKey: 'userId',
    targetKey: 'id'
})
//RefreshTokens-End

//Categories
db.categories.belongsTo(db.categories, {
    as: 'parent_category',
    foreignKey: 'parent_id'
})
db.categories.hasMany(db.categories, {
    as: 'child_category',
    foreignKey: 'parent_id'
})
//Categories-Ends

//Adverts
db.adverts.belongsTo(db.categories, {
    as: 'requested_service',
    foreignKey: 'requested_service_by_advertiser'
})
db.categories.hasMany(db.adverts, {
    as: 'requested_service',
    foreignKey: 'requested_service_by_advertiser'
})

db.adverts.belongsTo(db.categories, {
    as: 'provided_service',
    foreignKey: 'provided_service_by_advertiser'
})
db.categories.hasMany(db.adverts, {
    as: 'provided_service',
    foreignKey: 'provided_service_by_advertiser'
})

db.users.hasMany(db.adverts, {
    as: 'matched_user',
    foreignKey: 'matched_user_id'
})
db.adverts.belongsTo(db.users, {
    as: 'matched_user',
    foreignKey: 'matched_user_id'
})

db.users.hasMany(db.adverts, {
    as: 'advert_owner',
    foreignKey: 'user_id'
})
db.adverts.belongsTo(db.users, {
    as: 'advert_owner',
    foreignKey: 'user_id'
})
//Adverts-Ends

//UserRoles
db.users.belongsToMany(db.roles, { through: 'user_roles' })
db.roles.belongsToMany(db.users, { through: 'user_roles' })

db.users.hasMany(db.verificationCodes)
db.verificationCodes.belongsTo(db.users)
//UserRoles-Ends

module.exports = db
