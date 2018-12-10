/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bug_post_attachments', {
    bpa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bpa_post: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bpa_content: {
      type: "IMAGE",
      allowNull: false
    }
  }, {
    tableName: 'bug_post_attachments',
    timestamps: false
  });
};
