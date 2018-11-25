/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Menu = require('./Menu');
const RoleMenu = require('./RoleMenu');

const Role = sequelize.define('role', {
  name: Sequelize.STRING,
  remark: Sequelize.STRING,
  enable: Sequelize.BOOLEAN,
});

Role.belongsToMany(Menu, {through: RoleMenu});
Menu.belongsToMany(Role, {through: RoleMenu});

module.exports = Role;
