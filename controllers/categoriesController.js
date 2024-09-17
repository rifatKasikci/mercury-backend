const index = require('../models/index')
const Category = index.categories
const RepositoryBase = require('../repositories/repositoryBase')
const { ErrorDataResult, ErrorResult, SuccessDataResult, SuccessResult } = require('../core/utils/results/results')
const { categories } = require('../models/index')

const CategoryRepository = new RepositoryBase(Category)

module.exports.getAll = async (req, res) => {
    res.json(new SuccessDataResult(null, await CategoryRepository.getAll()))
}

module.exports.getById = async (req, res) => {
    const { id } = req.params
    res.json(new SuccessDataResult(null, await CategoryRepository.getById(id)))
}

module.exports.add = async (req, res) => {
    const categoryForAdd = req.body
    await CategoryRepository.add(categoryForAdd)
    res.json(new SuccessResult('Category added!'))
}

module.exports.update = async (req, res) => {
    const categoryForUpdate = req.body
    await CategoryRepository.update(categoryForUpdate)
    res.json(new SuccessResult('Category updated!'))
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await CategoryRepository.delete(id)
    res.json(new SuccessResult('Category deleted!'))
}
