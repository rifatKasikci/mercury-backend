const index = require('../models/index')
const TradeProduct = index.tradeProducts
const Advert = index.adverts
const RepositoryBase = require('../repositories/repositoryBase')
const { ErrorDataResult, ErrorResult, SuccessDataResult, SuccessResult } = require('../core/utils/results/results')
const { decodeToken } = require('../core/utils/hashHelper')
const { Op } = require('sequelize')
const includes = [
    {
        model: index.users,
        attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt', 'phoneNumber', 'identityNumber'] }
    },
    {
        model: index.adverts,
    }
]

const TradeProductRepository = new RepositoryBase(TradeProduct)
const AdvertRepository = new RepositoryBase(Advert)


module.exports.getAll = async (req, res) => {
    res.json(new SuccessDataResult(null, await TradeProductRepository.getAll()))
}

module.exports.getById = async (req, res) => {
    const { id } = req.params
    res.json(new SuccessDataResult(null, await TradeProductRepository.getById(id)))
}

module.exports.getByAdvertId = async (req, res) => {
    const { advertId } = req.params
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const tradeProducts = await TradeProductRepository.getFiltered({ advertId: advertId }, includes)
    const advert = await AdvertRepository.getOneFiltered({ id: advertId })
    if (advert.user_id === userId || advert.matched_user_id === userId) {
        return res.json(new SuccessDataResult(null, tradeProducts))
    }
    return res.json(new ErrorResult('You can not reach this information!'))
}

const findUserIdForConfirmation = (userId, advert) => {
    let userIdForConfirm = 0
    let isUserOwner = false
    if (advert.user_id===userId) {
        isUserOwner = true
        userIdForConfirm = advert.matched_user_id
    }else{
        userIdForConfirm = advert.user_id
    }
    return { userIdForConfirm, isUserOwner }
}

const isTradeFinished = (advert) => {
    if (advert.isRequestedServiceSended === true && advert.isProvidedServiceSended === true) {
        advert.tradeStatus = 'FINISHED'
    }
    return advert
}

const updateAdvert = (isUserOwner, advert) => {
    if (isUserOwner) {
        advert.isRequestedServiceSended = true
    }else{
        advert.isProvidedServiceSended = true
    }
    return isTradeFinished(advert)
}

const updateAdvertRevisionCount = (isUserOwner, advert) => {
    if (isUserOwner) {
        advert.revisionCountOfRequestedService -= 1
        advert.completionTimeOfRequestedService = (advert.completionTimeOfRequestedService*2)
        advert.tradeStatus = 'WAITING'
    }else{
        advert.revisionCountOfProvidedService -= 1 
        advert.completionTimeOfProvidedService = (advert.completionTimeOfProvidedService*2)
        advert.tradeStatus = 'WAITING'
    }
    return advert.save()
}

const controlUsersRevisionCount = (advert, isUserOwner) => {
    if (isUserOwner) {
        if (advert.revisionCountOfRequestedService===0) {
            return false
        }
        return true
    }else{
        if (advert.revisionCountOfProvidedService===0) {
            return false
        }
        return true
    }
}

module.exports.declineTradeProduct = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const { advertId } = req.body
    const advert = await AdvertRepository.getOneFiltered({ id: advertId, [Op.or]:[
        {user_id:userId},
        {matched_user_id:userId}
    ]})
    if (!advert) {
        return res.json(new ErrorResult('There is no advert like that!'))
    }
    const tradeProduct = await TradeProductRepository.getOneFiltered({advertId:advertId, userId:findUserIdForConfirmation(userId, advert).userIdForConfirm, isConfirmed:false})
    if (tradeProduct) {
        if (!controlUsersRevisionCount(advert, findUserIdForConfirmation(userId, advert).isUserOwner)) {
            return res.json(new ErrorResult('You do not have the right to revise!'))
        }
        await TradeProductRepository.delete(tradeProduct.id)
        updateAdvertRevisionCount(findUserIdForConfirmation(userId, advert).isUserOwner, advert)
        return res.json(new SuccessResult('Revision confirmed!'))
    }
    return res.json(new ErrorResult('Revision could not confirmed!'))
}

module.exports.confirmTradeProduct = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const { advertId } = req.body
    const advert = await AdvertRepository.getOneFiltered({ id: advertId, [Op.or]:[
        {user_id:userId},
        {matched_user_id:userId}
    ]})
    if (!advert) {
        return res.json(new ErrorResult('There is no advert like that!'))
    }
    const tradeProduct = await TradeProductRepository.getOneFiltered({advertId:advertId, userId:findUserIdForConfirmation(userId, advert).userIdForConfirm, isConfirmed:false})
    if (tradeProduct) {
        updateAdvert(findUserIdForConfirmation(userId, advert).isUserOwner,advert).save()
        tradeProduct.isConfirmed = true
        tradeProduct.save()
        return res.json(new SuccessResult('Product confirmed!'))
    }
    return res.json(new ErrorResult('Product could not confirmed!'))
}

module.exports.add = async (req, res) => {
    const tradeProductForAdd = req.body
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const advert = await AdvertRepository.getOneFiltered({ id: tradeProductForAdd.advertId })
    tradeProductForAdd.userId = userId
    tradeProductForAdd.isConfirmed = false
    const tradeProduct = await TradeProductRepository.getOneFiltered({ advertId: tradeProductForAdd.advertId, userId: userId })
    if (tradeProduct) {
        return res.json(new ErrorResult('You can not add a trade product like this!'))
    } else {
        if (advert.user_id === userId || advert.matched_user_id === userId) {
            await TradeProductRepository.add(tradeProductForAdd)
            return res.json(new SuccessResult('TradeProduct added!'))
        }
        return res.json(new ErrorResult('You can not do this action!'))
    }

}

module.exports.update = async (req, res) => {
    const tradeProductForUpdate = req.body
    await TradeProductRepository.update(tradeProductForUpdate)
    res.json(new SuccessResult('TradeProduct updated!'))
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await TradeProductRepository.delete(id)
    res.json(new SuccessResult('TradeProduct deleted!'))
}
