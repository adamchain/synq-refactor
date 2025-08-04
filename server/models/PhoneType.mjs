import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PhoneType extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    phoneTypeCd: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true,
      field: 'phone_type_cd'
    },
    phoneTypeName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'phone_type_name'
    }
  }, {
    sequelize,
    tableName: 'phone_type',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_type_cd" },
        ]
      },
      {
        name: "phone_type_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_type_cd" },
        ]
      },
    ]
  });
  }
}
