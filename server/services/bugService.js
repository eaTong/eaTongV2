/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */
const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Bug = require('../models/BugByName');
const BugByName = require('../models/BugByName');
const getBugsByName = require('../third-party/bugTracker/services/getBugsByName');
const moment = require('moment');

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
    return await Bug.findAll({...option});
  },

  getBugDetail: async ({id}) => {
    return await Bug.findOne({where: {id}});
  },

  staticsBugs: async () => {
    const bugs = await getCurrentBugStatus(moment().format('YYYY-MM-DD'));
    await Bug.bulkCreate(bugs);
  },

  staticsBugsByUser: async (time = moment().format('YYYY-MM-DD')) => {
    const bugs = await getBugsByName(time);
    const bugsByName = {date: time, enable: true};
    const userMapping = {
      '21': 'lb',
      '48': 'zyd',
      '60': 'lyd',
      '79': 'zyk',
      '80': 'gpj',
      '81': 'fym',
    };
    bugs.forEach(item => {
      bugsByName[userMapping[item.bg_assigned_to_user]] = item.count;
    });
    return await BugByName.create(bugsByName);
    // await Bug.bulkCreate(bugs);
  }
};


