/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const RoleMenu = sequelize.define('roleMenu', {}, {timestamps: false,});

module.exports = RoleMenu;
