import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientNumericMeasurement extends Model {
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
    patientNumericAttrId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient_numeric_attr',
        key: 'id'
      },
      field: 'patient_numeric_attr_id'
    },
    measureUnitId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'measure_unit_id'
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: true
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
    tableName: 'patient_numeric_measurement',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "patient_numeric_attr_id" },
        ]
      },
      {
        name: "patient_numeric_measurement_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_patient_numeric_measurement_patient_numeric_attr_id",
        using: "BTREE",
        fields: [
          { name: "patient_numeric_attr_id" },
        ]
      },
    ]
  });
  }
}
