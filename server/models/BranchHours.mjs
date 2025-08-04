import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BranchHours extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
      allowNull: false,
      field: 'st_time'
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'end_time'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'branch_hours',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "branch_id" },
          { name: "working_day_cd" },
        ]
      },
    ]
  });
  }
}
