/**
 * Created by eaTong on 2019-11-08 .
 * Description: auto generated in  2019-11-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Category = require('./Category');

const Note = sequelize.define('note', {
  title: {type: Sequelize.STRING},
  content: {type: Sequelize.TEXT},
  reference: {type: Sequelize.TEXT,comments:'引用'},
  source: {type: Sequelize.TEXT,comments:'来源',},
  images:{type:Sequelize.JSON},
  enable: Sequelize.BOOLEAN,
});

Note.belongsTo(Category);
Category.hasMany(Note);
module.exports = Note;
