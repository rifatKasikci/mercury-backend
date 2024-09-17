const redisClient = require('../core/utils/redisClient')
const rateLimit = require('express-rate-limit')
const RedisStore = require('rate-limit-redis')

const allowedIps = ['::1']
const specialUrls = ['/auth/login', '/auth/register','/auth/resetPassword']

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: async (req, res)=>{
        if (specialUrls.includes(req.url)) return 3 
        else return 1000
    },
    message: async (req, res)=>{
        if (specialUrls.includes(req.url)) return 'You tried more than three times in five minutes! Please wait five minutes!'
        else return 'You sended too many requests in five minutes! Please wait five minutes!'
    },
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args),
    }),
    skip:(req, res) => allowedIps.includes(req.ip)
})

module.exports = rateLimiter


