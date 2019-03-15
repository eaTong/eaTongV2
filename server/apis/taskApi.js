
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {LogicError} = require("../framework/errors");
const taskService = require('../services/taskService');

module.exports = {
  addTask: async (ctx) => {
    return await taskService.addTask(ctx.request.body);
  },
  updateTasks: async (ctx) => {
    return await taskService.updateTasks(ctx.request.body);
  },
  deleteTasks: async (ctx) => {
    return await taskService.deleteTasks(ctx.request.body.ids);
  },
  getTasks: async (ctx) => {
    return await taskService.getTasks(ctx.request.body);
  },
  getTaskDetail: async (ctx) => {
    return await taskService.getTaskDetail(ctx.request.body);
  }
};
  