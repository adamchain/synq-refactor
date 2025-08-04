import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BillingPayment extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    paymentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'payment',
        key: 'id'
      },
      field: 'payment_id'
    },
    billingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'billing_id'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    }
  }, {
    sequelize,
    tableName: 'billing_payment',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "fk_billing_payment_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_billing_payment_payment_id",
        using: "BTREE",
        fields: [
          { name: "payment_id" },
        ]
      },
    ]
  });
  }
}
