
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Task = sequelize.define('task', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Task;
