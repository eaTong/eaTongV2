/**
 * Created by eaTong on 2019-01-18 .
 * Description: auto generated in  2019-01-18
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Bug = sequelize.define('bug', {
  name: {type: Sequelize.STRING},
  new: {type: Sequelize.INTEGER},
  test: {type: Sequelize.INTEGER},
  complete: {type: Sequelize.INTEGER},
  return: {type: Sequelize.INTEGER},
  hang: {type: Sequelize.INTEGER},
  enable: Sequelize.BOOLEAN,
});

module.exports = Bug;
