import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Patient extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id'
      },
      field: 'client_id'
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
    primaryDoctorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'primary_doctor_id'
    },
    patientName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'patient_name'
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    breedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'breed_id'
    },
    speciesId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'species_id'
    },
    mixedBreed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'mixed_breed'
    },
    patientSexCd: {
      type: DataTypes.STRING(2),
      allowNull: true,
      field: 'patient_sex_cd'
    },
    patientColorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient_color',
        key: 'id'
      },
      field: 'patient_color_id'
    },
    patientStatusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient_status',
        key: 'id'
      },
      field: 'patient_status_id'
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    weightUnit: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'weight_unit'
    },
    estimatedWeight: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'estimated_weight'
    },
    insurance: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "N"
    },
    insuranceProvider: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'insurance_provider'
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'patient',
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
        name: "patient_client_id_idx",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "patient_breed_id_idx",
        using: "BTREE",
        fields: [
          { name: "breed_id" },
        ]
      },
      {
        name: "patient_patient_sex_cd_idx",
        using: "BTREE",
        fields: [
          { name: "patient_sex_cd" },
        ]
      },
      {
        name: "patient_patient_color_id_idx",
        using: "BTREE",
        fields: [
          { name: "patient_color_id" },
        ]
      },
      {
        name: "patient_created_by_idx",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "patient_updated_by_idx",
        using: "BTREE",
        fields: [
          { name: "updated_by" },
        ]
      },
      {
        name: "patient_primary_doctor_id_idx",
        using: "BTREE",
        fields: [
          { name: "primary_doctor_id" },
        ]
      },
      {
        name: "patient_branch_id_idx",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "patient_patient_status_id_idx",
        using: "BTREE",
        fields: [
          { name: "patient_status_id" },
        ]
      },
    ]
  });
  }
}
