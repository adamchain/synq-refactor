import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Country extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    countryCd: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true,
      field: 'country_cd'
    },
    countryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'country_name'
    }
  }, {
    sequelize,
    tableName: 'country',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_cd" },
        ]
      },
      {
        name: "country_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_cd" },
        ]
      },
    ]
  });
  }
}
