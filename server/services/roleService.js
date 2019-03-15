/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');
const {LogicError} = require('../framework/errors');
const Role = require('../models/Role');
const Menu = require('../models/Menu');

module.exports = {
  addRole: async (role) => {
    const usr = await Role.findOne({where: {name: role.name}});
    if (usr) {
      throw new LogicError(`角色(${role.name})已存在`);
    }
    role.password = md5(role.password).toString();
    role.enable = true;
    return await Role.create(role);
  },
  updateRoles: async (data) => {
    const usr = await Role.findOne({where: {name: data.name, id: {[Op.ne]: data.id}}});
    if (usr) {
      throw new LogicError(`角色(${data.name})已存在`);
    }
    // return await Role.findAll();
    return await Role.update(data, {where: {id: data.id}, fields: ['name', 'remark']})
  },
  deleteRoles: async (ids) => {
    return await Role.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },
  getRoles: async () => {
    const roles = await Role.findAll({where: {enable: true}, include: [{model: Menu, attributes: ['id']}]});
    return JSON.parse(JSON.stringify(roles)).map(role => {
      return {...role, menus: role.menus.map(menu => menu.id)}
    })
  },
  grantMenus: async (data) => {
    const role = await Role.findById(data.roleId);
    role.setMenus(data.menus);
    return await role.save();
  }
};
