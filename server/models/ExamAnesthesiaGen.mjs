import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ExamAnesthesiaGen extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    genId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'gen_id'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      unique: "fk_exam_anesthesia_gen_appt_id",
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
    surgeon: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    diagTest: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'diag_test'
    },
    procVerified: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'proc_verified'
    },
    catheter: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    catheterSize: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'catheter_size'
    },
    location: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    ivfluid: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    ivfluidType: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'ivfluid_type'
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    breathCircuit: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'breath_circuit'
    },
    o2Flow: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'o2_flow'
    },
    sterilePack: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'sterile_pack'
    },
    anesStTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'anes_st_time'
    },
    anesEndTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'anes_end_time'
    },
    surgeryStTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'surgery_st_time'
    },
    surgeryEndTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'surgery_end_time'
    },
    gas: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    asa: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    endotrachealTubeSize: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'endotracheal_tube_size'
    },
    noteId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'note_id'
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
    tableName: 'exam_anesthesia_gen',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "gen_id" },
        ]
      },
      {
        name: "appt_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "appt_id" },
        ]
      },
      {
        name: "exam_anesthesia_gen_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_exam_anesthesia_gen_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
