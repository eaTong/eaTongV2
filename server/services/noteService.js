/**
 * Created by eaTong on 2019-11-08 .
 * Description: auto generated in  2019-11-08
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Note = require('../models/Note');
const Category = require('../models/Category');

module.exports = {

  addNote: async (note) => {
    note.logo = JSON.stringify(note.logo || []);
    note.enable = true;
    return await Note.create(note);
  },

  updateNotes: async (note) => {
    return await Note.update(note, {where: {id: note.id}})
  },

  deleteNotes: async (ids) => {
    return await Note.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getNotes: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {
      where: {
        [Op.and]: [
          {enable: true,},
          {
            [Op.or]: [
              {title: {[Op.like]: `%${keywords}%`}},
              {content: {[Op.like]: `%${keywords}%`}},
            ]
          }
        ]
      }
    };
    const {dataValues: {total}} = await Note.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Note.findAll({
      order: [['createdAt', 'desc']],
      offset: pageIndex * pageSize,
      limit: pageSize, ...option,
      include:[{model:Category}]
    });
    return {total, list}
  },

  getNoteDetail: async ({id}) => {
    return await Note.findOne({where: {id}});
  }
};
