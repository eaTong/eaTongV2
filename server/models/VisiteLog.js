/**
 * Created by eaTong on 2019-10-31 .
 * Description: auto generated in  2019-10-31
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const VisiteLog = sequelize.define('visiteLog', {
  path: {type: Sequelize.STRING},
  time: {type: Sequelize.INTEGER},
  status: {type: Sequelize.INTEGER},
  ip: {type: Sequelize.STRING},
  userAgent: {type: Sequelize.STRING},
  method: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = VisiteLog;
