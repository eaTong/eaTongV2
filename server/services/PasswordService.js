/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Password = require('../models/Password');
const nodemailer = require('nodemailer');
const moment = require('moment');
const {mail} = require('../../config/server.config');

class PasswordService extends BaseService {

  static async addPassword(password) {
    password.enable = true;
    password.attachment = password.attachment ? JSON.stringify(password.attachment) : '';
    return await Password.create(password);
  }

  static async updatePasswords(data) {
    data.attachment = data.attachment ? JSON.stringify(data.attachment) : '';
    return await Password.update(data, {where: {id: data.id}})
  }

  static async deletePasswords(ids) {
    return await Password.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getPasswords({pageIndex = 0, pageSize = 20, keywords = ''}) {
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
    const passwords = await Password.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    const list = passwords.map(item => ({
      ...item.dataValues,
      attachment: item.attachment ? JSON.parse(item.dataValues.attachment) : []
    }));
    return {total, list}
  }

  static
  async getPasswordDetail(id) {
    return await Password.findOne({where: {id}});
  }

  static
  async checkNearly() {
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
}

module
  .exports = PasswordService;
