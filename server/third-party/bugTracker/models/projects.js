/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects', {
    pj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pj_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pj_active: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pj_default_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pj_auto_assign_default_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pj_auto_subscribe_default_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pj_enable_pop3: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pj_pop3_username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_pop3_password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_pop3_email_from: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_enable_custom_dropdown1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pj_enable_custom_dropdown2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pj_enable_custom_dropdown3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pj_custom_dropdown_label1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_custom_dropdown_label2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_custom_dropdown_label3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_custom_dropdown_values1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_custom_dropdown_values2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_custom_dropdown_values3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pj_default: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pj_description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'projects',
    timestamps: false
  });
};
