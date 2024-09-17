const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const index = require('../models/index.js')
const User = index.users
const Role = index.roles
const  { ErrorResult, SuccessResult} = require('../core/utils/results/results')

const isUserAuthorized = async (userId, rolesForFunction) => {
    let isAuthorized = false
    const user = await User.findOne({
        where:{
            id:userId
        },
        include:Role
    })
    if (user) {
        user.roles.forEach((role)=>{
            if (rolesForFunction.includes(role.name)) {
                isAuthorized = true
            }else{
                return
            }
        })
    }
    return isAuthorized
}

const requireAuth = (roles) => {
    const roleArray = roles.split(',')
    return async (req, res, next) => {
        let token = ''
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1]            
        }else{
            return res.status(401).json(new ErrorResult('You do not have permission for this action!'))
        }
        const decodedToken = jwt_decode(token)
        const isAuthorized = await isUserAuthorized(decodedToken.id,roleArray)
        if (token) {
            jwt.verify(token, 'mysecretkey', (err, decodedToken) => {
                if (isAuthorized) {
                    if (err) {
                        res.status(401).json(err)
                    } else {
                        next()
                    }
                }else{
                    res.status(401).json(new ErrorResult('You do not have permission for this action!'))
                }
                
            })
        } else {
            res.status(401).json(new ErrorResult('User has not authorized!'))
        }
    }
}

module.exports = { requireAuth }
