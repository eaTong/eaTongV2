/**
 * Created by eatong on 18-2-17.
 */
const {Op} = require('sequelize');

const Log = require('../models/OperationLog');

module.exports = {
  insertLog: async (log) => {
    await Log.create(log);
  }
};
