import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class State extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    countryCd: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      field: 'country_cd'
    },
    stateCd: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'state_cd'
    },
    stateName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'state_name'
    }
  }, {
    sequelize,
    tableName: 'state',
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
        name: "state_country_cd_idx",
        using: "BTREE",
        fields: [
          { name: "country_cd" },
        ]
      },
    ]
  });
  }
}
