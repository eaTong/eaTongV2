/**
 * Created by eaTong on 2019-01-18 .
 * Description: auto generated in  2019-01-18
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BaseService = require('../framework/BaseService');
const Bug = require('../models/Bug');
const moment = require('moment');
const getCurrentBugStatus = require('../third-party/bugTracker/services/fetchBugs');

class BugService extends BaseService {

  static async addBug(bug) {
    bug.enable = true;
    return await Bug.create(bug);
  }

  static async updateBugs(data) {
    return await Bug.update(data, {where: {id: data.id}})
  }

  static async deleteBugs(ids) {
    return await Bug.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  }

  static async getBugs({pageIndex = 0, pageSize = 20, keywords = ''}) {
    const option = {where: {enable: true}};
    const {dataValues: {total}} = await Bug.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Bug.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  }

  static async getBugDetail(id) {
    return await Bug.findOne({where: {id}});
  }

  static async staticsBugs() {
    const bugs = await getCurrentBugStatus(moment().format('YYYY-MM-DD'));
    await Bug.bulkCreate(bugs);
  }
}

module.exports = BugService;
