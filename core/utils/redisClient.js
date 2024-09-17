const RedisClient = require('ioredis')
require('dotenv').config()

module.exports = new RedisClient.Redis({
    port: process.env.REDIS_AUTH_PORT,
    host: process.env.REDIS_AUTH_HOST,
    password:process.env.REDIS_AUTH_PASSWORD
})