import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class CalendarBlockRepeat extends Model {
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
      field: 'repeat_interval'
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
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    }
  }, {
    sequelize,
    tableName: 'calendar_block_repeat',
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
        name: "fk_calendar_block_repeat_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
