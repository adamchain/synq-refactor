import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ReminderRepeat extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    repeatType: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'repeat_type'
    },
    repeatInterval: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      field: 'repeat_interval'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'end_date'
    },
    onSunday: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_sunday'
    },
    onMonday: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_monday'
    },
    onTuesday: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_tuesday'
    },
    onWednesday: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_wednesday'
    },
    onThursday: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_thursday'
    },
    onFriday: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_friday'
    },
    onSaturday: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_saturday'
    },
    onDay: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_day'
    },
    onWeek: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_week'
    },
    onLastWeek: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'on_last_week'
    },
    maxRepeat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_repeat'
    },
    totalRepeat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'total_repeat'
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
    tableName: 'reminder_repeat',
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
      {
        name: "reminder_repeat_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
