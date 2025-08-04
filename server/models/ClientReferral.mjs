import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ClientReferral extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    referralName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'referral_name'
    },
    referrerName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'referrer_name'
    },
    discountName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'discount_name'
    },
    discountTypeCd: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'discount_type_cd'
    },
    discountAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'discount_amount'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    }
  }, {
    sequelize,
    tableName: 'client_referral',
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
        name: "client_referral_discount_type_cd_idx",
        using: "BTREE",
        fields: [
          { name: "discount_type_cd" },
        ]
      },
      {
        name: "client_referral_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
