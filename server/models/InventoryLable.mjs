import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryLable extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'start_date'
    },
    strength: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    refill: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    refillExpiry: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'refill_expiry'
    },
    refillExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'refill_expiry_date'
    },
    providerId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'provider_id'
    },
    lot: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    rxNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'rx_number'
    },
    instruction: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inventory_lable',
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
        name: "fk_inventory_lable_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_inventory_lable_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
