import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryAddOn extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    addOnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'add_on_id'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'is_deleted'
    }
  }, {
    sequelize,
    tableName: 'inventory_add_on',
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
        name: "fk_inventory_add_on_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
