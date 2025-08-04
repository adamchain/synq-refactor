import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserRole extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    roleId: {
      autoIncrement: true,
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true,
      field: 'role_id'
    },
    roleCd: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      unique: "role_cd_UNIQUE",
      field: 'role_cd'
    },
    roleName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'role_name'
    }
  }, {
    sequelize,
    tableName: 'user_role',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "role_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_cd" },
        ]
      },
    ]
  });
  }
}
