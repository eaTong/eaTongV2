
/**
 * Created by eaTong on 2018-25-11 .
 * Description: auto generated in  2018-25-11
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Task = sequelize.define('task', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Task;
