import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserWorkingHours extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    workingDayCd: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true,
      field: 'working_day_cd'
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
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'user_working_hours',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "branch_id" },
          { name: "working_day_cd" },
        ]
      },
      {
        name: "user_working_hours_working_day_idx",
        using: "BTREE",
        fields: [
          { name: "working_day_cd" },
        ]
      },
      {
        name: "user_working_hours_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
