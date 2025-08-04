import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryPatientReminder extends Model {
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
    inventoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'inventory',
        key: 'id'
      },
      field: 'inventory_id'
    },
    patientId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'id'
      },
      field: 'patient_id'
    },
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id'
      },
      field: 'client_id'
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    due: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    startAlert: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'start_alert'
    },
    stopAlert: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'stop_alert'
    },
    status: {
      type: DataTypes.TINYINT,
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
    tableName: 'inventory_patient_reminder',
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
        name: "fk_inventory_patient_reminder_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_inventory_patient_reminder_client_id",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "fk_inventory_patient_reminder_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
      {
        name: "fk_inventory_patient_reminder_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
