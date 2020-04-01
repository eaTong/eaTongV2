const {sendEmail} = require('../../server/framework/emailUtils');

sendEmail({mailTo: 'eatongchou@gmail.com', subject: 'test', text: 'aha.....'})
