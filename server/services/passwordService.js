
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Password = require('../models/Password');
const nodemailer = require('nodemailer');
const moment = require('moment');
const {mail} = require('../../config/server.config');

module.exports = {

  addPassword: async (password) => {
    password.logo = JSON.stringify(password.logo || []);
    password.enable = true;
    return await Password.create(password);
  },

  updatePasswords: async (password) => {
    password.logo = JSON.stringify(password.logo || []);
    return await Password.update(password, {where: {id: password.id}})
  },

  deletePasswords: async (ids) => {
    return await Password.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getPasswords: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {
      where: {
        [Op.and]: [
          {enable: true,},
          {
            [Op.or]: [
              {name: {[Op.like]: `%${keywords}%`}},
              {type: {[Op.like]: `%${keywords}%`}},
              {host: {[Op.like]: `%${keywords}%`}},
              {remark: {[Op.like]: `%${keywords}%`}}
            ]
          }
        ],

      }
    };
    const {dataValues: {total}} = await Password.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Password.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getPasswordDetail: async ({id}) => {
    return await Password.findOne({where: {id}});
  },
   checkNearly:async()=> {
    const today = moment();
    today.set('month', today.get('month') + 1);
    const nearlyPasswords = await Password.findAll({where: {expireTime: {[Op.lt]: today.format('YYYY-MM-DD')}}});
    if (nearlyPasswords && nearlyPasswords.length > 0) {
      const transporter = nodemailer.createTransport(mail);
      const mailContent = `
<div>
  <p style="color:#999">密码即将过期提醒</p>   
  <p >以下密码即将过期:${nearlyPasswords.map(item =>
        `<p style="color:#eb655e">${item.dataValues.name}:<b>${moment(item.dataValues.expireTime).format('YYYY-MM-DD')}</b></p>`
      )}
  </p>      
</div>
    `;
      const mailObj = {
        from: `过期提醒 <${mail.auth.user}>`,
        // 主题
        subject: '过期提醒',
        // 收件人
        // to: 'qinyangdong@aikesi-soft.com,liuyajun@aikesi-soft.com,liuyingbing@aikesi-soft.com,liqiao@aikesi-soft.com,pengyin@aikesi-soft.com',
        to: 'zhouyidong@aikesi-soft.com',
        // 邮件内容，HTML格式
        html: mailContent,
      };
      transporter.sendMail(mailObj);
    }
  }
};
