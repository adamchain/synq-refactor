import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class WeightUnit extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    unitCd: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'unit_cd'
    }
  }, {
    sequelize,
    tableName: 'weight_unit',
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
