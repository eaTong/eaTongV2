
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {LogicError} = require("../framework/errors");
const fileService = require('../services/fileService');

module.exports = {
  addFile: async (ctx) => {
    return await fileService.addFile(ctx.request.body);
  },
  updateFiles: async (ctx) => {
    return await fileService.updateFiles(ctx.request.body);
  },
  deleteFiles: async (ctx) => {
    return await fileService.deleteFiles(ctx.request.body.ids);
  },
  getFiles: async (ctx) => {
    return await fileService.getFiles(ctx.request.body);
  },
  getFileDetail: async (ctx) => {
    return await fileService.getFileDetail(ctx.request.body);
  }
};
  