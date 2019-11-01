/**
 * Created by eaTong on 2019-10-31 .
 * Description: auto generated in  2019-10-31
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const VisiteLog = require('../models/VisiteLog');

module.exports = {

  addVisiteLog: async (visiteLog) => {
    visiteLog.enable = true;
    return await VisiteLog.create(visiteLog);
  },

  updateVisiteLogs: async (visiteLog) => {
    return await VisiteLog.update(visiteLog, {where: {id: visiteLog.id}})
  },

  deleteVisiteLogs: async (ids) => {
    return await VisiteLog.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getVisiteLogs: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {
      where: {
        [Op.and]: [
          {enable: true,},
          {
            [Op.or]: [
              {userAgent: {[Op.like]: `%${keywords}%`}},
              {path: {[Op.like]: `%${keywords}%`}},
            ]
          }
        ]
      }
    };
    const {dataValues: {total}} = await VisiteLog.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await VisiteLog.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getVisiteLogDetail: async ({id}) => {
    return await VisiteLog.findOne({where: {id}});
  }
};
