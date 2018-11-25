/**
 * Created by eatong on 18-2-20.
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const User = require('../models/User');
const Menu = require('../models/Menu');
const Role = require('../models/Role');

class MenuService extends BaseService {
  static async getMenus(log) {
    // await Log.create(log);
    return await Menu.findAll({where: {enable: true}});
  }

  static async getAuthorisedMenu(userId) {
    return await Menu.findAll({
      where: {enable: true},
      include: [{
        model: Role,
        where: {id: {[Op.gt]: 0}},
        include: [
          {model: User, where: {id: userId}, through: {where: {userId: userId}}}
        ]
      }]
    });

  }
}

module.exports = MenuService;

// MenuService.getAuthorisedMenu(2);
