/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statuses', {
    st_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    st_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    st_sort_seq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    st_style: {
      type: DataTypes.STRING,
      allowNull: true
    },
    st_default: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'statuses',
    timestamps: false
  });
};
