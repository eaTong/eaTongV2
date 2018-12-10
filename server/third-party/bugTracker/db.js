/**
 * Created by eaTong on 2018/12/10 .
 * Description:
 */
const Sequelize = require('sequelize');
const {thirdParty:{bugTracker}} = require('../../../config/server.config');

const bugTrackerDB = new Sequelize(  `mssql://${bugTracker.user}:${bugTracker.password}@${bugTracker.host}:${bugTracker.port}/${bugTracker.database}`);

module.exports = bugTrackerDB;
