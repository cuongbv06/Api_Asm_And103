var nodeemailer = require('nodemailer')
const transporter = nodeemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenphuc02042004@gmail.com',
        pass: 'phuc02042004'
    },
})

module.exports = transporter