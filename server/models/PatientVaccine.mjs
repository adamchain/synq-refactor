import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientVaccine extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
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
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'provider_id'
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
      type: DataTypes.STRING(45),
      allowNull: true
    },
    qty: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    administered: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    typeId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'type_id'
    },
    periodId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'period_id'
    },
    dose: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    manufacturer: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    serial: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    lot: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    rabiesTag: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'rabies_tag'
    },
    patientSexCd: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      field: 'patient_sex_cd'
    },
    patientWeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'patient_weight'
    },
    patientWeightUnit: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'patient_weight_unit'
    },
    animalControlLicensingMonths: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'animal_control_licensing_months'
    },
    usdaLicensingMonths: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'usda_licensing_months'
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
    tableName: 'patient_vaccine',
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
        name: "patient_vaccine_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_patient_vaccine_appt_id",
        using: "BTREE",
        fields: [
          { name: "appt_id" },
        ]
      },
      {
        name: "fk_patient_vaccine_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
      {
        name: "fk_patient_vaccine_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
