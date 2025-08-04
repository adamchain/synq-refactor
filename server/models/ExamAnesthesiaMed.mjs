import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ExamAnesthesiaMed extends Model {
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
      allowNull: false,
      references: {
        model: 'appt',
        key: 'id'
      },
      field: 'appt_id'
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
    type: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dose: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    doseUnit: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'dose_unit'
    },
    bottle: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    concentration: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    volume: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    route: {
      type: DataTypes.TINYINT,
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'exam_anesthesia_med',
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
        name: "exam_anesthesia_med_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_exam_anesthesia_med_appt_id",
        using: "BTREE",
        fields: [
          { name: "appt_id" },
        ]
      },
      {
        name: "fk_exam_anesthesia_med_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
