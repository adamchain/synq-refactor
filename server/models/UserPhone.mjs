import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserPhone extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    phoneNbr: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true,
      field: 'phone_nbr'
    },
    phoneTypeCd: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      field: 'phone_type_cd'
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
    tableName: 'user_phone',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "phone_nbr" },
          { name: "branch_id" },
        ]
      },
      {
        name: "user_phone_type_cd_idx",
        using: "BTREE",
        fields: [
          { name: "phone_type_cd" },
        ]
      },
      {
        name: "user_phone_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
