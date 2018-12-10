/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('priorities', {
    pr_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pr_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pr_sort_seq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pr_background_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pr_style: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pr_default: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'priorities',
    timestamps: false
  });
};
