
/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Password = sequelize.define('password', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Password;
