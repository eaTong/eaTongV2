/**
 * Created by eatong on 18-2-11.
 */
const Sequelize = require('sequelize');
const {mysql} = require('../../config/server.config');


const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;
