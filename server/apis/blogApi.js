/**
 * Created by eaTong on 2019-10-10 .
 * Description: auto generated in  2019-10-10
 */

const {LogicError} = require("../framework/errors");
const blogService = require('../services/blogService');

module.exports = {
  addBlog: async (ctx) => {
    return await blogService.addBlog(ctx.request.body);
  },
  updateBlogs: async (ctx) => {
    return await blogService.updateBlogs(ctx.request.body);
  },
  deleteBlogs: async (ctx) => {
    return await blogService.deleteBlogs(ctx.request.body.ids);
  },
  getBlogs: async (ctx) => {
    return await blogService.getBlogs(ctx.request.body);
  },
  getBlogDetail: async (ctx) => {
    const readBlog = ctx.session.readBlog || [];
    const data = ctx.request.body;
    let shouldAddCount;
    if (!ctx.session.loginUser && readBlog.indexOf(data.id) === -1) {
      shouldAddCount = true;
      readBlog.push(data.id);
      ctx.session.readBlog = readBlog;
    }
    return await blogService.getBlogDetail(data, shouldAddCount);

  }
};
