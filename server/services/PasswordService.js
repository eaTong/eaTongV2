
/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Password = require('../models/Password');

class PasswordService extends BaseService {

  static async addPassword(password) {
    password.enable = true;
    return await Password.create(password);
  }

  static async updatePasswords(data) {
    return await Password.update(data, {where: {id: data.id}})
  }

  static async deletePasswords(ids) {
    return await Password.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getPasswords(pageIndex = 0, pageSize = 20) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await Password.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Password.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  }

  static async getPasswordDetail(id) {
    return await Password.findOne({where: {id}});
  }
}

module.exports = PasswordService;
  