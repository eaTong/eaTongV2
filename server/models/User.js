/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const User = sequelize.define('user', {
  account: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  enable: Sequelize.BOOLEAN,
});

module.exports = User;
