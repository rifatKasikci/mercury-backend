const validationRules = {}

validationRules.advert = require('./advertValidationRules')
validationRules.category = require('./categoryValidationRules')
validationRules.user = require('./userValidationRules')
validationRules.basicInput = require('./basicInputValidationRules')
validationRules.tradeProduct = require('./tradeProductValidationRules')
validationRules.password = require('./passwordValidationRules')
validationRules.waitlistUser = require('./waitlistUserValidationRules')

module.exports = validationRules
