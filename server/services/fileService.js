
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const File = require('../models/File');

module.exports = {

  addFile: async (file) => {
    file.logo = JSON.stringify(file.logo || []);
    file.enable = true;
    return await File.create(file);
  },

  updateFiles: async (file) => {
    file.logo = JSON.stringify(file.logo || []);
    return await File.update(file, {where: {id: file.id}})
  },

  deleteFiles: async (ids) => {
    return await File.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getFiles: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await File.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await File.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getFileDetail: async ({id}) => {
    return await File.findOne({where: {id}});
  }
};
