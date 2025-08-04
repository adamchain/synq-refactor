import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserRoleMapping extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    roleCd: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true,
      field: 'role_cd'
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
    }
  }, {
    sequelize,
    tableName: 'user_role_mapping',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "branch_id" },
          { name: "role_cd" },
        ]
      },
      {
        name: "user_role_mapping_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_role_mapping_branch_id_idx",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "user_role_mapping_role_id_idx",
        using: "BTREE",
        fields: [
          { name: "role_cd" },
        ]
      },
    ]
  });
  }
}
