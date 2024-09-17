const WaitlistUser = require('../models/index').waitlistUsers;
const mailService = require('../core/mailing/mailService')
const Mail = require('../core/mailing/mail')
const emailTemplate = require('../core/mailing/templates/emailTemplate.js')
const { SuccessResult, SuccessDataResult, ErrorDataResult, ErrorResult } = require('../core/utils/results/results')
const RepositoryBase = require('../repositories/repositoryBase')
const { AuthError } = require('../core/utils/errors')
const ReCaptchaHelper = require('../core/utils/reCaptchaHelper')

const WaitlistUserRepository = new RepositoryBase(WaitlistUser)

module.exports.add = async (req, res) => {
    await ReCaptchaHelper.validateReCaptchaToken(req.body.reCaptchaToken)
    const waitlistUserForAdd = req.body
    waitlistUserForAdd.isConfirmed = false
    const waitlistUser = await WaitlistUserRepository.getOneFiltered({ email: waitlistUserForAdd.email })
    if (waitlistUser) {
        throw new AuthError('This email is already registered!')
    }
    const addedWaitlistUser = await WaitlistUserRepository.add(waitlistUserForAdd)
    const mail = new Mail(waitlistUserForAdd.email, 'Your Application has Received!', emailTemplate.applicationReceived(waitlistUserForAdd))
    await mailService.sendMail(mail)
    return res.json(new SuccessResult('Waitlist user added!'))
}

