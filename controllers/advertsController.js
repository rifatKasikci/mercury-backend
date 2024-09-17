const index = require('../models/index')
const Advert = index.adverts
const User = index.users
const RepositoryBase = require('../repositories/repositoryBase')
const { ErrorDataResult, ErrorResult, SuccessDataResult, SuccessResult } = require('../core/utils/results/results')
const { decodeToken } = require('../core/utils/hashHelper')
const db = require('../models/index')
const { Op } = require('sequelize')
const  mailService = require('../core/mailing/mailService')
const emailTemplate = require('../core/mailing/templates/emailTemplate')
const Mail = require('../core/mailing/mail')
const includes = [
    {
        model: db.categories,
        as: 'requested_service',
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    {
        model: db.categories,
        as: 'provided_service',
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    {
        model: db.users,
        as: 'advert_owner',
        attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt', 'phoneNumber', 'identityNumber'] }
    },
    {
        model: db.users,
        as: 'matched_user',
        attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt', 'phoneNumber', 'identityNumber'] }
    }
]


const AdvertRepository = new RepositoryBase(Advert)
const UserRepository = new RepositoryBase(User)


module.exports.getAll = async (req, res) => {
    res.json(new SuccessDataResult(null, await AdvertRepository.getAll(includes)))
}

module.exports.getById = async (req, res) => {
    const { id } = req.params
    res.json(new SuccessDataResult(null, await AdvertRepository.getById(id, includes)))
}

module.exports.getByUserId = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    res.json(new SuccessDataResult(null, await AdvertRepository.getFiltered({ [Op.or]: [{ user_id: userId }, { matched_user_id: userId }] }, includes)))
}

module.exports.getUsersWaitingTrades = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const adverts = await AdvertRepository.getFiltered({
        [Op.and]: [
            {
                [Op.or]: [
                    { user_id: userId },
                    { matched_user_id: userId }
                ]
            },
            {
                [Op.or]: [
                    { tradeStatus: 'WAITING' },
                    { tradeStatus: 'WAITING-CONFIRMATION' }
                ]
            }
        ]

    })
    res.json(new SuccessDataResult(null, adverts))
}

module.exports.getUsersStartedTrades = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const adverts = await AdvertRepository.getFiltered({ [Op.or]:[{user_id:userId},{matched_user_id:userId}], tradeStatus: 'TRADE-STARTED' })
    res.json(new SuccessDataResult(null, adverts))
}

module.exports.getUsersFinishedTrades = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const adverts = await AdvertRepository.getFiltered({ [Op.or]:[{user_id:userId},{matched_user_id:userId}], tradeStatus: 'FINISHED' })
    res.json(new SuccessDataResult(null, adverts))
}

module.exports.confirmMatchedUser = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const user = await UserRepository.getOneFiltered({id:userId})
    const { advertId } = req.body
    const advert = await AdvertRepository.getOneFiltered({ id: advertId, user_id: userId, isMatchedUserConfirmed: false }, includes)
    const matchedUser = await UserRepository.getOneFiltered({id:advert.matched_user_id})
    if (!advert) {
        return res.json(new ErrorResult('There is no advert like that!'))
    }
    advert.isMatchedUserConfirmed = true
    advert.tradeStatus = 'TRADE-STARTED'
    advert.save()
    const mail = new Mail(matchedUser.email, 'Order Started', emailTemplate.orderStartedTemplate(matchedUser.userName,user.userName))
    await mailService.sendMail(mail)
    return res.json(new SuccessResult('Matched user confirmed! Trade has started!'))
}

module.exports.declineMatchedUser = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const { advertId } = req.body
    const advert = await AdvertRepository.getOneFiltered({ id: advertId, user_id: userId, isMatchedUserConfirmed: false }, includes)
    if (!advert) {
        return res.json(new ErrorResult('There is no advert like that!'))
    }
    advert.isMatchedUserConfirmed = false
    advert.matched_user_id = null
    advert.tradeStatus = 'WAITING'
    advert.save()
    return res.json(new SuccessResult('Matched user declined! Wait for new matches!'))
}

module.exports.getMatches = async (req, res) => {
    const { advertId } = req.params
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const advert = await AdvertRepository.getOneFiltered({ id: advertId, user_id: userId }, includes)
    const matchesOfAdvert = await AdvertRepository.getFiltered({
        requested_service_by_advertiser: advert.provided_service_by_advertiser,
        provided_service_by_advertiser: advert.requested_service_by_advertiser,
        user_id: {
            [Op.not]: userId
        }
    }, includes)
    res.json(new SuccessDataResult(null, matchesOfAdvert))
}

module.exports.getMatchesOrCreateAdvert = async (req, res) => {
    const advertForAdd = req.body
    advertForAdd.user_id = decodeToken(req.headers.authorization.split(' ')[1]).id
    advertForAdd.isMatchedUserConfirmed = false
    advertForAdd.isRequestedServiceSended = false
    advertForAdd.isProvidedServiceSended = false
    advertForAdd.tradeStatus = 'WAITING'
    advertForAdd.matched_user_id = null
    const matchesOfAdvert = await AdvertRepository.getFiltered({
        requested_service_by_advertiser: advertForAdd.provided_service_by_advertiser,
        provided_service_by_advertiser: advertForAdd.requested_service_by_advertiser,
        user_id: {
            [Op.not]: advertForAdd.user_id
        },
        matched_user_id: null
    }, includes)
    if (matchesOfAdvert.length <= 0) {
        await AdvertRepository.add(advertForAdd)
        return res.json(new SuccessResult('New advert added! Please wait for somebody match!'))
    } else {
        return res.json(new SuccessDataResult('Founded new potacial matches for your adverts!', matchesOfAdvert))
    }
}

module.exports.matchUser = async (req, res) => {
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    const { advertId } = req.body
    const advert = await AdvertRepository.getOneFiltered({ id: advertId, user_id: { [Op.not]: userId }, matched_user_id: null }, includes)
    const user = await UserRepository.getOneFiltered({ id: userId })
    if (!advert) {
        return res.json(new ErrorResult('You can not match with this advert!'))
    }
    advert.matched_user_id = user.id
    advert.tradeStatus = 'WAITING-CONFIRMATION'
    advert.save()
    return res.json(new SuccessResult('User has matched with advert!'))
}


module.exports.add = async (req, res) => {
    const advertForAdd = req.body
    advertForAdd.user_id = decodeToken(req.headers.authorization.split(' ')[1]).id
    advertForAdd.isMatchedUserConfirmed = false
    advertForAdd.isRequestedServiceSended = false
    advertForAdd.isProvidedServiceSended = false
    advertForAdd.tradeStatus = 'WAITING'
    advertForAdd.matched_user_id = null
    await AdvertRepository.add(advertForAdd)
    res.json(new SuccessResult('Advert added!'))
}

module.exports.update = async (req, res) => {
    const advertForUpdate = req.body
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    var result = await AdvertRepository.update(advertForUpdate, { user_id: userId })
    result[0]
        ? res.json(new SuccessResult('Advert updated!'))
        : res.json(new ErrorResult('Advert could not updated!'))
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    const userId = decodeToken(req.headers.authorization.split(' ')[1]).id
    await AdvertRepository.delete(id, { user_id: userId })
        ? res.json(new SuccessResult('Advert deleted!'))
        : res.json(new ErrorResult('Advert could not deleted!!'))
}
