import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserBranchMapping extends Model {
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
    userStatusCd: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'user_status_cd'
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'user_branch_mapping',
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
        ]
      },
      {
        name: "user_branch_mapping_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_branch_mapping_branch_id_idx",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "user_status_cd_idx",
        using: "BTREE",
        fields: [
          { name: "user_status_cd" },
        ]
      },
    ]
  });
  }
}
