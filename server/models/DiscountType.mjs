import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DiscountType extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    discountTypeCd: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true,
      field: 'discount_type_cd'
    },
    discountTypeName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'discount_type_name'
    }
  }, {
    sequelize,
    tableName: 'discount_type',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "discount_type_cd" },
        ]
      },
      {
        name: "discount_type_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "discount_type_cd" },
        ]
      },
    ]
  });
  }
}
