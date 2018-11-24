/**
 * Created by eatong on 18-2-17.
 */
const {Op} = require('sequelize');

const BaseService = require('../framework/BaseService');
const Log = require('../models/OperationLog');

class LogService extends BaseService {
  static async insertLog(log) {
    await Log.create(log);
  }
}

module.exports = LogService;
