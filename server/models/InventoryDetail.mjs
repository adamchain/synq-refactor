import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryDetail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    useLots: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'use_lots'
    },
    onHand: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'on_hand'
    },
    alertQty: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'alert_qty'
    },
    measure: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    controlledSubstance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'controlled_substance'
    },
    isMicrochip: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'is_microchip'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    }
  }, {
    sequelize,
    tableName: 'inventory_detail',
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
        name: "inventory_detail_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
