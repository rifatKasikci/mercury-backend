const index = require('../models/index')
const User = index.users
const RepositoryBase = require('../repositories/repositoryBase')
const { hashTextWithSalt } = require('../core/utils/hashHelper')
const { ErrorDataResult, ErrorResult, SuccessDataResult, SuccessResult } = require('../core/utils/results/results')

const userRepository = new RepositoryBase(User)

module.exports.getAll = async (req,res) => {
    res.json(new SuccessDataResult(null, await userRepository.getAll()))
}

module.exports.getById = async ( req, res) => {
    const { id } = req.params
    res.json(new SuccessDataResult(null, await userRepository.getById(id)))
}

module.exports.add = async (req, res) => {
    res.json(new SuccessDataResult('User added!', await userRepository.add(req.body)))
}

module.exports.update = async (req, res) => {
    const userForUpdate = req.body
    userForUpdate.passwordHash = hashTextWithSalt(userForUpdate.passwordHash)
    res.json(new SuccessDataResult('User updated!', await userRepository.update(userForUpdate)))
}