/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Category = require('../models/Category');
const Note = require('../models/Note');
const Blog = require('../models/Blog');

module.exports = {

  addCategory: async (category) => {
    category.enable = true;
    return await Category.create(category);
  },

  updateCategoryies: async (category) => {
    return await Category.update(category, {where: {id: category.id}})
  },

  deleteCategoryies: async (ids) => {
    return await Category.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getCategoryies: async ({pageIndex = 0, pageSize = 20, keywords = '', type}) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    if (typeof type !== 'undefined') {
      option.where.type = type;
    }
    const {dataValues: {total}} = await Category.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Category.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getCategoryDetail: async ({id}) => {
    const category = await Category.findOne({where: {id}, raw: true});
    if (category.type === 1) {
      category.notes = await Note.findAll({
        where: {categoryId: id}, raw: true,
        order: [['createdAt', 'desc']],
      });
    } else {
      category.blogs = await Blog.findAll({
        where: {categoryId: id}, raw: true,
        order: [['createdAt', 'desc']],
      });
    }
    return category;
  }
};
