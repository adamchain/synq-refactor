import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class MeasureUnit extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    measureUnitId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'measure_unit_id'
    },
    measureUnitTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'measure_unit_type_id'
    },
    measureUnitCd: {
      type: DataTypes.STRING(3),
      allowNull: false,
      field: 'measure_unit_cd'
    },
    measureUnitName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'measure_unit_name'
    }
  }, {
    sequelize,
    tableName: 'measure_unit',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_unit_id" },
        ]
      },
      {
        name: "measure_unit_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_unit_id" },
        ]
      },
    ]
  });
  }
}
