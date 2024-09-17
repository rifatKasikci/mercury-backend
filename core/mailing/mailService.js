const MailgunService = require('./mailgunService/mailgunService')
const mailgunService = new MailgunService()
class MailService {
    constructor(mailService){
        this._mailService = mailService
    }

    sendMail = (mail) => {
        this._mailService.sendMail(mail)
    } 
}
const mailService = new MailService(mailgunService)
module.exports = mailService
