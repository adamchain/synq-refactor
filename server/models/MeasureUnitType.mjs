import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class MeasureUnitType extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    measureUnitTypeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'measure_unit_type_id'
    },
    measureUnitTypeName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'measure_unit_type_name'
    }
  }, {
    sequelize,
    tableName: 'measure_unit_type',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_unit_type_id" },
        ]
      },
      {
        name: "measure_unit_type_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_unit_type_id" },
        ]
      },
    ]
  });
  }
}
