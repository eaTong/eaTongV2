
/**
 * Created by eaTong on 2018-25-11 .
 * Description: auto generated in  2018-25-11
 */

const {LogicError} = require("../framework/errors");
const TaskService = require('../services/TaskService');
const BaseApi = require('../framework/BaseApi');


class TaskApi extends BaseApi {
  static async addTask(ctx) {
    return await TaskService.addTask(ctx.request.body);
  }

  static async updateTasks(ctx) {
    return await TaskService.updateTasks(ctx.request.body);
  }

  static async deleteTasks(ctx) {
    return await TaskService.deleteTasks(ctx.request.body.ids);
  }

  static async getTasks(ctx) {
    const {pageIndex = 0, pageSize = 20} = ctx.request.body;
    return await TaskService.getTasks(pageIndex, pageSize);
  }

  static async getTaskDetail(ctx) {
    return await TaskService.getTaskDetail(ctx.request.body);
  }

}

module.exports = TaskApi;
  