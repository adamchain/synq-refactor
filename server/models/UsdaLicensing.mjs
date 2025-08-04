import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UsdaLicensing extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    valueMonths: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'value_months'
    }
  }, {
    sequelize,
    tableName: 'usda_licensing',
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
