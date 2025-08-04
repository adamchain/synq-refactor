import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ResetPassword extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id'
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'is_active'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'reset_password',
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
