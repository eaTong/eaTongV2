/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bugs', {
    bg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bg_short_desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bg_reported_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bg_reported_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    bg_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bg_priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bg_org: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bg_category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bg_project: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bg_assigned_to_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bg_last_updated_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bg_last_updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bg_user_defined_attribute: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bg_project_custom_dropdown_value1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bg_project_custom_dropdown_value2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bg_project_custom_dropdown_value3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bg_tags: {
      type: DataTypes.STRING,
      allowNull: true
    },
    审批: {
      type: DataTypes.STRING,
      allowNull: true
    },
    评估: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    模块: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'bugs',
    timestamps: false
  });
};
