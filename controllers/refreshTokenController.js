const index = require('../models/index');
const RefreshToken = index.refreshTokens;
const User = index.users;
const RepositoryBase = require('../repositories/repositoryBase');
const { v4:uuidv4 } = require('uuid');
const { AuthError } = require('../core/utils/errors')

const userRepository = new RepositoryBase(User);
const refreshTokenRepository = new RepositoryBase(RefreshToken);

const deleteUserRefreshToken = async (userId) => {
    const token = await refreshTokenRepository.getOneFiltered({ userId:userId});
    await refreshTokenRepository.delete(token.id);
}

module.exports.createRefreshToken = async (userId) => {
    const user = await userRepository.getById(userId);
    const userToken = await refreshTokenRepository.getOneFiltered({userId:userId});
    if (userToken) {
        await deleteUserRefreshToken(userId);
    }
    if (!user) {
        throw new AuthError('User not found!');
    }
    const token = uuidv4();
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 86400);
    let refreshToken = await refreshTokenRepository.add({
        token:token,
        userId:userId,
        expirationDate:expirationDate
    });
    
    return refreshToken.token
}

module.exports.verifyRefreshToken = async (token) => {
    const refreshToken = await refreshTokenRepository.getOneFiltered({token:token})
    if (!refreshToken) {
        throw new AuthError('Token not found!')
    }
    const isExpired = refreshToken.expirationDate.getTime() < new Date().getTime();
    if (isExpired) {
        await refreshTokenRepository.delete(refreshToken.id)
        throw new AuthError('Refresh token is expired. Please login again!')
    }else{
        return refreshToken
    }
}
