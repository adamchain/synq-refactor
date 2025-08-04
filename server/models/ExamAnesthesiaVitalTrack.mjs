import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ExamAnesthesiaVitalTrack extends Model {
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
    apptId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'appt',
        key: 'id'
      },
      field: 'appt_id'
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
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'st_time'
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
    tableName: 'exam_anesthesia_vital_track',
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
        name: "fk_exam_anesthesia_vital_track_appt_id",
        using: "BTREE",
        fields: [
          { name: "appt_id" },
        ]
      },
      {
        name: "fk_exam_anesthesia_vital_track_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_exam_anesthesia_vital_track_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
