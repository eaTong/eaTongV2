/**
 * Created by eaTong on 2018-31-12 .
 * Description: auto generated in  2018-31-12
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const TaskProgress = require('../models/TaskProgress');
const Task = require('../models/Task');

class TaskProgressService extends BaseService {

  static async addTaskProgress(progress) {
    progress.enable = true;
    return await TaskProgress.create(progress);
  }

  static async updateTaskProgress(progress) {
    return await TaskProgress.update(progress, {where: {id: progress.id}})
  }

  static async deleteTaskProgress(ids) {
    return await TaskProgress.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getTaskProgress({pageIndex = 0, pageSize = 20, keywords = ''}) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await TaskProgress.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await TaskProgress.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  }

  static async getTaskProgressByTask({taskId}) {
    return await Task.findById(taskId, {
      include: [
        {model: TaskProgress,}
      ]
    });
  }

  static async getTaskProgressDetail(id) {
    return await TaskProgress.findOne({where: {id}});
  }
}

module.exports = TaskProgressService;
