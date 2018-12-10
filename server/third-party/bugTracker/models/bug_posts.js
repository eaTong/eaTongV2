/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bug_posts', {
    bp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bp_bug: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bp_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bp_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bp_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    bp_comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bp_comment_search: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bp_email_from: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bp_email_to: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bp_file: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bp_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bp_content_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bp_parent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bp_original_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bp_hidden_from_external_users: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bp_email_cc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'bug_posts',
    timestamps: false
  });
};
