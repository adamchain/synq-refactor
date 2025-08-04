import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class WorkingDay extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    },
    workingDayName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'working_day_name'
    }
  }, {
    sequelize,
    tableName: 'working_day',
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
