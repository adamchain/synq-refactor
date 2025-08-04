import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class BillingPackageItem extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        billingItemId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "billing_item",
            key: "id",
          },
          field: "billing_item_id",
        },
        branchId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "branch",
            key: "id",
          },
          field: "branch_id",
        },
        inventoryId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "inventory",
            key: "id",
          },
          field: "inventory_id",
        },
        medId: {
          type: DataTypes.BIGINT,
          allowNull: true,
          field: "med_id",
        },
        qty: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        deleted: {
          type: DataTypes.TINYINT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "billing_package_item",
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "billing_item_id" }, { name: "inventory_id" }],
          },
          {
            name: "fk_billing_package_item_branch_id",
            using: "BTREE",
            fields: [{ name: "branch_id" }],
          },
          {
            name: "fk_billing_package_item_inventory_id",
            using: "BTREE",
            fields: [{ name: "inventory_id" }],
          },
        ],
      }
    );
  }
}
