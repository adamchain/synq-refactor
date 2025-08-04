import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ClientStatus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    clientStatusCd: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true,
      field: 'client_status_cd'
    },
    clientStatusName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'client_status_name'
    }
  }, {
    sequelize,
    tableName: 'client_status',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "client_status_cd" },
        ]
      },
      {
        name: "client_status_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "client_status_cd" },
        ]
      },
    ]
  });
  }
}
