import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryProcedure extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    procedureId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'procedure_id'
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
      allowNull: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    }
  }, {
    sequelize,
    tableName: 'inventory_procedure',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "procedure_id" },
          { name: "inventory_id" },
        ]
      },
      {
        name: "fk_inventory_procedure_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_inventory_procedure_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
