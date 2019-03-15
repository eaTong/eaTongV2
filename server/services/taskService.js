
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Task = require('../models/Task');

module.exports = {

  addTask: async (task) => {
    task.enable = true;
    return await Task.create(task);
  },

  updateTasks: async (task) => {
    return await Task.update(task, {where: {id: task.id}})
  },

  deleteTasks: async (ids) => {
    return await Task.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getTasks: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Task.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Task.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getTaskDetail: async ({id}) => {
    return await Task.findOne({where: {id}});
  }
};
