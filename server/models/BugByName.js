/**
 * Created by eaTong on 2019-01-18 .
 * Description: auto generated in  2019-01-18
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const BugByName = sequelize.define('bugByName', {
  zyd: {type: Sequelize.INTEGER, defaultValue: 0},
  gpj: {type: Sequelize.INTEGER, defaultValue: 0},
  lyd: {type: Sequelize.INTEGER, defaultValue: 0},
  lb: {type: Sequelize.INTEGER, defaultValue: 0},
  fym: {type: Sequelize.INTEGER, defaultValue: 0},
  zyk: {type: Sequelize.INTEGER, defaultValue: 0},
  date: {type: Sequelize.DATEONLY},
  enable: Sequelize.BOOLEAN,
});

module.exports = BugByName;
