import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class EstimateItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    estimateId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'estimate',
        key: 'id'
      },
      field: 'estimate_id'
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
      allowNull: true,
      defaultValue: 0
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'estimate_item',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "estimate_item_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_estimate_item_estimate_id",
        using: "BTREE",
        fields: [
          { name: "estimate_id" },
        ]
      },
      {
        name: "fk_estimate_item_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
