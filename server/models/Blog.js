/**
 * Created by eaTong on 2019-10-10 .
 * Description: auto generated in  2019-10-10
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Category = require('./Category');

const Blog = sequelize.define('blog', {
  title: {type: Sequelize.STRING},
  content: {type: Sequelize.TEXT},
  description: {type: Sequelize.TEXT},
  publishTime: {type: Sequelize.DATE},
  viewCount: {type: Sequelize.INTEGER},
  contentSize: {type: Sequelize.INTEGER},
  enable: Sequelize.BOOLEAN,
});

Blog.belongsTo(Category);
Category.hasMany(Blog);
module.exports = Blog;
