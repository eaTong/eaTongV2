/**
 * Created by eatong on 18-2-20.
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const User = require('../models/User');
const Menu = require('../models/Menu');
const Role = require('../models/Role');

class MenuService extends BaseService {
  static async getMenus() {
    const menus = await Menu.findAll({where: {enable: true}});
    return structureMenu(menus.map(menu => menu.dataValues));
  }

  static async getAuthorisedMenu(userId) {
    const menus = await Menu.findAll({
      where: {enable: true},
      include: [{
        model: Role,
        where: {id: {[Op.gt]: 0}},
        include: [
          {model: User, where: {id: userId}, through: {where: {userId: userId}}}
        ]
      }]
    });
    return structureMenu(menus.map(menu => menu.dataValues))
  }
}

function structureMenu(menus) {
  let keyMapping = {};
  let parentKeyMapping = {};
  for (let menu of menus) {
    keyMapping[menu.path] = menu;
    if (!parentKeyMapping[menu.parentPath]) {
      parentKeyMapping[menu.parentPath] = [];
    }
    parentKeyMapping[menu.parentPath].push(menu);
  }

  function getChildrenPath(path) {
    return (parentKeyMapping[path] || []).map(item => ({...item, children: getChildrenPath(item.path)}));
  }

  return getChildrenPath('')
}

module.exports = MenuService;

// MenuService.getMenus();
