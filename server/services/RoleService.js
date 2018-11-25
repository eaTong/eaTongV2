/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Role = require('../models/Role');
const Menu = require('../models/Menu');

class RoleService extends BaseService {

  static async addRole(role) {
    const usr = await Role.findOne({where: {name: role.name}});
    if (usr) {
      throw new LogicError(`角色(${role.name})已存在`);
    }
    role.password = md5(role.password).toString();
    role.enable = true;
    return await Role.create(role);
  }

  static async updateRoles(data) {
    const usr = await Role.findOne({where: {name: data.name, id: {[Op.ne]: data.id}}});
    if (usr) {
      throw new LogicError(`角色(${data.name})已存在`);
    }
    // return await Role.findAll();
    return await Role.update(data, {where: {id: data.id}, fields: ['name', 'remark']})
  }

  static async deleteRoles(ids) {
    return await Role.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getRoles() {
    const roles = await Role.findAll({where: {enable: true}, include: [{model: Menu, attributes: ['id']}]});
    return JSON.parse(JSON.stringify(roles)).map(role => {
      return {...role, menus: role.menus.map(menu => menu.id)}
    })
  }

  static async grantMenus(data) {
    const role = await Role.findById(data.roleId);
    role.setMenus(data.menus);
    return await role.save();
  }
}

module.exports = RoleService;


// RoleService.addRole({name: 'eaTong', account: '15284412582', password: 'eatong123'})
// RoleService.updateRoles({name: 'eaTong', account: '18288757143', id: 5})
// RoleService.deleteRoles([21]);

// RoleService.login({account: '123', password: '123'});

/*
(async () => {
  const roles = await Role.findAll();
  console.log(roles.toString())
})();
*/
