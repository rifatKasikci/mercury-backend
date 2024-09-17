require('dotenv').config()

class Mail { 
    constructor(to, subject, html, from = process.env.MAILGUN_SENDER){
        this.to = to
        this.subject = subject
        this.html = html
        this.from = from
    }
}

module.exports = Mail
