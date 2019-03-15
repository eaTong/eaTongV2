
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Bug = require('../models/Bug');

module.exports = {

  addBug: async (bug) => {
    bug.enable = true;
    return await Bug.create(bug);
  },

  updateBugs: async (bug) => {
    return await Bug.update(bug, {where: {id: bug.id}})
  },

  deleteBugs: async (ids) => {
    return await Bug.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getBugs: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Bug.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Bug.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getBugDetail: async ({id}) => {
    return await Bug.findOne({where: {id}});
  }
};
