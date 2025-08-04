import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserStatus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userStatusCd: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true,
      field: 'user_status_cd'
    },
    userStatusName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'user_status_name'
    }
  }, {
    sequelize,
    tableName: 'user_status',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_status_cd" },
        ]
      },
      {
        name: "user_status_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_status_cd" },
        ]
      },
    ]
  });
  }
}
