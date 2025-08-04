import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserPwd extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    updatedTime: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'user_pwd',
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
