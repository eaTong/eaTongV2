/**
 * Created by eaTong on 2018-31-12 .
 * Description: auto generated in  2018-31-12
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const BaseService = require('../framework/BaseService');
const Task = require('../models/Task');

class TaskService extends BaseService {

  static async addTask(task) {
    task.enable = true;
    return await Task.create(task);
  }

  static async updateTasks(data) {
    return await Task.update(data, {where: {id: data.id}})
  }

  static async deleteTasks(ids) {
    return await Task.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getTasks({pageIndex = 0, pageSize = 20, keywords = ''}) {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Task.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Task.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  }

  static async getTaskDetail({id}) {
    return await Task.findOne({where: {id}});
  }
}

module.exports = TaskService;
