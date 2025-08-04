import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Appt extends Model {
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
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'provider_id'
    },
    apptTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appt_type',
        key: 'id'
      },
      field: 'appt_type_id'
    },
    apptStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appt_status',
        key: 'id'
      },
      field: 'appt_status_id'
    },
    stTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'st_time'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dropOff: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'drop_off'
    },
    isRepeat: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'is_repeat'
    },
    notes: {
      type: DataTypes.STRING(1200),
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
    tableName: 'appt',
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
        name: "appt_patient_id_idx",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
      {
        name: "appt_branch_id_idx",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "appt_provider_id_idx",
        using: "BTREE",
        fields: [
          { name: "provider_id" },
        ]
      },
      {
        name: "fk_appt_appt_status_id",
        using: "BTREE",
        fields: [
          { name: "appt_status_id" },
        ]
      },
      {
        name: "fk_appt_appt_type_id",
        using: "BTREE",
        fields: [
          { name: "appt_type_id" },
        ]
      },
    ]
  });
  }
}
