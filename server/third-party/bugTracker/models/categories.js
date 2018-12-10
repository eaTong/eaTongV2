/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categories', {
    ct_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ct_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ct_sort_seq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ct_default: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'categories',
    timestamps: false
  });
};
