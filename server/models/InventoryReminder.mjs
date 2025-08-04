import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryReminder extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    inventoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'inventory',
        key: 'id'
      },
      field: 'inventory_id'
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    due: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    startAlert: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'start_alert'
    },
    stopAlert: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'stop_alert'
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
    tableName: 'inventory_reminder',
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
        name: "fk_inventory_reminder_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_inventory_reminder_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
