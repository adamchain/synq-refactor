import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientFreeformMeasurement extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    patientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient',
        key: 'id'
      },
      field: 'patient_id'
    },
    patientFreeformAttrId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient_freeform_attr',
        key: 'id'
      },
      field: 'patient_freeform_attr_id'
    },
    value: {
      type: DataTypes.STRING(1000),
      allowNull: false
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
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'patient_freeform_measurement',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "patient_freeform_attr_id" },
        ]
      },
      {
        name: "patient_freeform_measurement_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_patient_freeform_measurement_patient_freeform_attr_id",
        using: "BTREE",
        fields: [
          { name: "patient_freeform_attr_id" },
        ]
      },
    ]
  });
  }
}
