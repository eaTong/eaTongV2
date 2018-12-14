/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Password = sequelize.define('password', {
  name: {type: Sequelize.STRING},
  type: {type: Sequelize.STRING},
  host: {type: Sequelize.STRING},
  account: {type: Sequelize.STRING},
  password: {type: Sequelize.STRING},
  remark: {type: Sequelize.STRING},
  attachment: {type: Sequelize.STRING},
  expireTime: {type: Sequelize.DATE},
  enable: Sequelize.BOOLEAN,
});

module.exports = Password;
