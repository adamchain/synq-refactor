import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class CalendarBlock extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    usrId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'usr_id'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'st_date'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'end_date'
    },
    stTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'st_time'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tzName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'tz_name'
    },
    allDay: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'all_day'
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
    tableName: 'calendar_block',
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
        name: "fk_calendar_block_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
