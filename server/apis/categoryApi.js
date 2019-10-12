
/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

const {LogicError} = require("../framework/errors");
const categoryService = require('../services/categoryService');

module.exports = {
  addCategory: async (ctx) => {
    return await categoryService.addCategory(ctx.request.body);
  },
  updateCategoryies: async (ctx) => {
    return await categoryService.updateCategoryies(ctx.request.body);
  },
  deleteCategoryies: async (ctx) => {
    return await categoryService.deleteCategoryies(ctx.request.body.ids);
  },
  getCategoryies: async (ctx) => {
    return await categoryService.getCategoryies(ctx.request.body);
  },
  getCategoryDetail: async (ctx) => {
    return await categoryService.getCategoryDetail(ctx.request.body);
  }
};
