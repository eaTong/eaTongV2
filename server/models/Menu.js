/**
 * Created by eatong on 18-2-20.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Menu = sequelize.define('menu', {
  path: {type: Sequelize.STRING, unique: true},
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
  parentPath: {type: Sequelize.STRING, comment: '父层path'},
  type: {type: Sequelize.INTEGER, comment: '菜单类型 ： 0 文件夹 ，1 菜单 ， 2 按钮'},
  enable: Sequelize.BOOLEAN,
});

module.exports = Menu;
