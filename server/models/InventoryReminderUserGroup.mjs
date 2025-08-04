import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryReminderUserGroup extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    reminderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'reminder',
        key: 'id'
      },
      field: 'reminder_id'
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'group_id'
    }
  }, {
    sequelize,
    tableName: 'inventory_reminder_user_group',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reminder_id" },
          { name: "group_id" },
        ]
      },
    ]
  });
  }
}
