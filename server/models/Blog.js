
/**
 * Created by eaTong on 2019-10-10 .
 * Description: auto generated in  2019-10-10
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Blog = sequelize.define('blog', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Blog;
