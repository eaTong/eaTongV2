
/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Category = require('../models/Category');

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

  getCategoryies: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Category.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Category.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getCategoryDetail: async ({id}) => {
    return await Category.findOne({where: {id}});
  }
};
