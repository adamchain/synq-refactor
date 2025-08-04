import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientMed extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    patientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'patient',
        key: 'id'
      },
      field: 'patient_id'
    },
    apptId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'appt',
        key: 'id'
      },
      field: 'appt_id'
    },
    billingId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'billing_id'
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    qty: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'start_date'
    },
    strength: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    inventoryExpiryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'inventory_expiry_id'
    },
    inventoryExpiryOtherDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'inventory_expiry_other_days'
    },
    refillMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'refill_max'
    },
    refillRemaining: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'refill_remaining'
    },
    refillExpirationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'refill_expiration_id'
    },
    refillExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'refill_expiration_date'
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
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'provider_id'
    },
    rxNumber: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'rx_number'
    },
    din: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'DIN'
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    addToBilling: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'add_to_billing'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'patient_med',
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
        name: "patient_med_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_patient_med_appt_id",
        using: "BTREE",
        fields: [
          { name: "appt_id" },
        ]
      },
      {
        name: "fk_patient_med_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
      {
        name: "fk_patient_med_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
