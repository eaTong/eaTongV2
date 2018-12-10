/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_user_xref', {
    pu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pu_project: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pu_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pu_auto_subscribe: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pu_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pu_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'project_user_xref',
    timestamps: false
  });
};
