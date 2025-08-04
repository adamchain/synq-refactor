import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ReminderUser extends Model {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    }
  }, {
    sequelize,
    tableName: 'reminder_user',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reminder_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "reminder_user_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
