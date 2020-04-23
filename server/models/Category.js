/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Category = sequelize.define('category', {
  name: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  type: {type: Sequelize.INTEGER, comments: '0为博客， 1为笔记', default: 0},
  enable: Sequelize.BOOLEAN,
});

module.exports = Category;
