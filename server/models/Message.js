/**
 * Created by eaTong on 2019-10-10 .
 * Description: auto generated in  2019-10-10
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Message = sequelize.define('message', {
  name: {type: Sequelize.STRING},
  email: {type: Sequelize.STRING},
  website: {type: Sequelize.STRING},
  content: {type: Sequelize.TEXT},
  ip: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Message;
