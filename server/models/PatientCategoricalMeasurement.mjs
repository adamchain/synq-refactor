import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientCategoricalMeasurement extends Model {
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
    patientCategoricalAttrId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient_categorical_attr',
        key: 'id'
      },
      field: 'patient_categorical_attr_id'
    },
    value: {
      type: DataTypes.STRING(5),
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
    tableName: 'patient_categorical_measurement',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "patient_categorical_attr_id" },
        ]
      },
      {
        name: "patient_cat_measurement_cat_measure_cd_idx",
        using: "BTREE",
        fields: [
          { name: "patient_categorical_attr_id" },
        ]
      },
      {
        name: "patient_categorical_measurement_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
