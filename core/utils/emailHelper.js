const nodemailer = require('nodemailer')
require('dotenv').config()

const transport = nodemailer.createTransport({
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
  secure: true,
  auth: {
     user: process.env.SENDER_ADDRESS,
     pass: process.env.SENDER_PASSWORD,
  },
})

// SEND EMAIL
module.exports.send = async function (to, context, html) {
  return await new Promise(function (resolve, reject) {
     transport.sendMail(
        {
           to,
           from: {
              name: process.env.SENDER_NAME,
              address: process.env.SENDER_ADDRESS,
           },
           subject: context.subject,
           html,
        },
        function (err, info) {
           if (err) return reject(err)
           resolve(info)
        }
     )
  })
}
