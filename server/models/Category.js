
/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Category = sequelize.define('category', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Category;
