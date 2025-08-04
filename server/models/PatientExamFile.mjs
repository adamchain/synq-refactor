import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientExamFile extends Model {
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
    fileName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'file_name'
    },
    filePath: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'file_path'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'patient_exam_file',
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
        name: "patient_exam_file_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_patient_exam_file_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
