import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryRxPrescription extends Model {
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
    strength: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    expirationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'expiration_id'
    },
    expirationOtherDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'expiration_other_days'
    },
    lot: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    lotExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'lot_expiration_date'
    },
    instructions: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inventory_rx_prescription',
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
        name: "fk_inventory_rx_prescription_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
