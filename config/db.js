require('dotenv').config()

let databaseCredentials
if (process.env.NODE_ENV==='development') {
    databaseCredentials = {
        HOST: process.env.DEVELOPMENT_HOST,
        USER: process.env.DEVELOPMENT_USER,
        PASSWORD: process.env.DEVELOPMENT_PASSWORD,
        DB: process.env.DEVELOPMENT_DB,
        dialect: process.env.DEVELOPMENT_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}else if (process.env.NODE_ENV==='production') {
    databaseCredentials = {
        HOST: process.env.PRODUCTION_HOST,
        USER: process.env.PRODUCTION_USER,
        PASSWORD: process.env.PRODUCTION_PASSWORD,
        DB: process.env.PRODUCTION_DB,
        dialect: process.env.PRODUCTION_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}

module.exports = databaseCredentials