/**
 * Created by eaTong on 2019-11-08 .
 * Description: auto generated in  2019-11-08
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Note = sequelize.define('note', {
  title: {type: Sequelize.STRING},
  content: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Note;
