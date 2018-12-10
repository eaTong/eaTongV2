/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orgs', {
    og_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    og_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    og_domain: {
      type: DataTypes.STRING,
      allowNull: true
    },
    og_non_admins_can_use: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_external_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_be_assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_only_see_own_reported: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_edit_sql: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_delete_bug: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_edit_and_delete_posts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_merge_bugs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_mass_edit_bugs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_use_reports: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_edit_reports: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_view_tasks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_edit_tasks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_search: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_other_orgs_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_can_assign_to_internal_users: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_category_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_priority_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_assigned_to_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_status_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_project_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_org_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_udf_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_tags_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_active: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    og_审批_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    og_评估_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    og_模块_field_permission_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'orgs',
    timestamps: false
  });
};
