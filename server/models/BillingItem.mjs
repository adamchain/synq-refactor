import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BillingItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    inventoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'inventory',
        key: 'id'
      },
      field: 'inventory_id'
    },
    packageId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'package_id'
    },
    billingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'billing_id'
    },
    patientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'patient',
        key: 'id'
      },
      field: 'patient_id'
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'provider_id'
    },
    serviceName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'service_name'
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    itemPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'item_price'
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discountType: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'discount_type'
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qty: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    declined: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    medId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'med_id'
    },
    isRefill: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'is_refill'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'billing_item',
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
        name: "billing_item_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "billing_item_billing_id",
        using: "BTREE",
        fields: [
          { name: "billing_id" },
        ]
      },
      {
        name: "fk_billing_item_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
      {
        name: "fk_billing_item_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
