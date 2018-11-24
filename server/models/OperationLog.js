/**
 * Created by eatong on 18-2-17.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const User = sequelize.define('operationLog', {
  operator: Sequelize.INTEGER,
  type: Sequelize.STRING,
  url: Sequelize.STRING,
  req: Sequelize.TEXT,
});


module.exports = User;
