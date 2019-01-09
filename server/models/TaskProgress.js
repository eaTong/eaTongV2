/**
 * Created by eaTong on 2018-25-11 .
 * Description: auto generated in  2018-25-11
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Task = require('./Task');

const TaskProgress = sequelize.define('task_progress', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

Task.hasMany(TaskProgress);
TaskProgress.belongsTo(Task);

module.exports = TaskProgress;
