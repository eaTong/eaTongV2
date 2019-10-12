/**
 * Created by eaTong on 2019-10-10 .
 * Description: auto generated in  2019-10-10
 */
const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Blog = require('../models/Blog');
const {extractDescription} = require("../framework/utils");

module.exports = {

  addBlog: async (blog) => {
    blog.enable = true;
    blog.contentSize = blog.content.length;
    blog.publishTime = new Date();
    blog.description = extractDescription(blog.content).slice(0, 200);
    blog.viewCount = 0;
    return await Blog.create(blog);
  },

  updateBlogs: async (blog) => {
    blog.contentSize = blog.content.length;
    blog.description = extractDescription(blog.content).slice(0, 200);
    return await Blog.update(blog, {where: {id: blog.id}})
  },

  deleteBlogs: async (ids) => {
    return await Blog.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getBlogs: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {where: {enable: true, title: {[Op.like]: `%${keywords}%`}, content: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Blog.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Blog.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getBlogDetail: async ({id}) => {
    return await Blog.findOne({where: {id}});
  }
};
