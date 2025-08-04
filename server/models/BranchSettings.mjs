import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BranchSettings extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    notificationJson: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'notification_json'
    },
    prefJson: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'pref_json'
    },
    integrationJson: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'integration_json'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'branch_settings',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
