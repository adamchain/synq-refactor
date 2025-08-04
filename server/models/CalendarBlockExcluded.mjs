import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class CalendarBlockExcluded extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    blockId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'block_id'
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'calendar_block_excluded',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "block_id" },
          { name: "date" },
        ]
      },
      {
        name: "fk_calendar_block_excluded_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
