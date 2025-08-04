import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryLot extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    inventoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
      allowNull: true
    },
    lotNumber: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'lot_number'
    },
    manufacturer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'expiry_date'
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    poNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'po_number'
    },
    poVendor: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'po_vendor'
    },
    active: {
      type: DataTypes.CHAR(1),
      allowNull: true
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
    tableName: 'inventory_lot',
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
        name: "fk_inventory_lot_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_inventory_lot_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
