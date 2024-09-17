const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
require('dotenv').config()



class MailgunService {

    constructor(){
        this.mailgun = mailgun.client({username:"api",key: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN,url: process.env.MAILGUN_HOST})
    }

    sendMail = (mail) => {

        const data = {
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html:mail.html
        };
        this.mailgun.messages.create(process.env.MAILGUN_DOMAIN, data).then(msg=>{
            console.log(msg)
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = MailgunService