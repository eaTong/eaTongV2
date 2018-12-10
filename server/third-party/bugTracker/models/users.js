/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    us_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    us_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    us_salt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    us_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    us_firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    us_lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    us_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    us_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_default_query: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_enable_notifications: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_auto_subscribe: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_auto_subscribe_own_bugs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    us_auto_subscribe_reported_bugs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    us_send_notifications_to_self: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    us_active: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_bugs_per_page: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    us_forced_project: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    us_reported_notifications: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_assigned_notifications: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_subscribed_notifications: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_signature: {
      type: DataTypes.STRING,
      allowNull: true
    },
    us_use_fckeditor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_enable_bug_list_popups: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_created_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_org: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    us_most_recent_login_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: false
  });
};
