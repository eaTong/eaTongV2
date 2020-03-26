const nodemailer = require("nodemailer");
const config = require('../../config/server.config')

function sendEmail({mailTo, subject, text, html}) {

  let transporter = nodemailer.createTransport(config.mail);

  transporter.sendMail({
    from: '"eaTong <zhouyidong@aikesi-soft.com>', // sender address
    to: mailTo, // list of receivers
    subject, // Subject line
    text, // plain text body
    html // html body
  }).catch();

}

module.exports.sendEmail = sendEmail;

