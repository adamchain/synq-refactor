import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ClockHistory extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    empId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'emp_id'
    },
    inTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'in_time'
    },
    inOption: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'in_option'
    },
    outTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'out_time'
    },
    outOption: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'out_option'
    }
  }, {
    sequelize,
    tableName: 'clock_history',
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
        name: "fk_clock_history_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
