const nodemailer = require('nodemailer')
require('dotenv').config()

class NodemailerService {

    createTransport = (options) => {
        const transport = nodemailer.createTransport({
            host: process.env.SERVER_HOST,
            port: process.env.SERVER_PORT,
            secure: true,
            auth: {
                user: process.env.SENDER_ADDRESS,
                pass: process.env.SENDER_PASSWORD,
            },
        })
        return transport
    }

    sendMail = (mail) => {
        this.createTransport(null).sendMail(
            {
                to: mail.to,
                from: mail.from,
                subject: mail.subject,
                html: mail.html,
            },
            function (err, info) {
                if (err) {
                    throw err
                }
                console.log(info)
            }
        )


    }
}

module.exports = NodemailerService
