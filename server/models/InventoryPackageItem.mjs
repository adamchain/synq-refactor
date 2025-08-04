import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryPackageItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    packageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'package_id'
    },
    inventoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'inventory',
        key: 'id'
      },
      field: 'inventory_id'
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
    qty: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inventory_package_item',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "package_id" },
          { name: "inventory_id" },
        ]
      },
      {
        name: "inventory_package_item_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_inventory_package_item_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
