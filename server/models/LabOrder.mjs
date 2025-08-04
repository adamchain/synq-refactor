import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LabOrder extends Model {
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
      allowNull: true,
      references: {
        model: 'patient',
        key: 'id'
      },
      field: 'patient_id'
    },
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id'
      },
      field: 'client_id'
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
    labType: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'lab_type'
    },
    labVendor: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'lab_vendor'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status_id'
    },
    orderNum: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'order_num'
    },
    resultFile: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'result_file'
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
    },
    submittedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'submitted_time'
    },
    submittedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'submitted_by'
    }
  }, {
    sequelize,
    tableName: 'lab_order',
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
        name: "fk_lab_order_appt_id",
        using: "BTREE",
        fields: [
          { name: "appt_id" },
        ]
      },
      {
        name: "fk_lab_order_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_lab_order_client_id",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "fk_lab_order_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
