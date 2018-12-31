
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
    return await TaskService.getTasks(ctx.request.body);
  }

  static async getTaskDetail(ctx) {
    return await TaskService.getTaskDetail(ctx.request.body);
  }

}

module.exports = TaskApi;
