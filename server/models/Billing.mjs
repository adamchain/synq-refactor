import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Billing extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    billingId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'billing_id'
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
    patientId: {
      type: DataTypes.BIGINT,
      allowNull: true,
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
    apptId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'appt',
        key: 'id'
      },
      unique: "fk_billing_appt_id",
      field: 'appt_id'
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'sub_total'
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'service_fee'
    },
    salesTax: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'sales_tax'
    },
    taxTotal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'tax_total'
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discountType: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'discount_type'
    },
    tip: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    statusId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'status_id'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by'
    },
    statusUpdateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'status_update_time'
    },
    updatedProviderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_provider_id'
    },
    apptTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'appt_type',
        key: 'id'
      },
      field: 'appt_type_id'
    }
  }, {
    sequelize,
    tableName: 'billing',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "billing_id" },
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
        name: "billing_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_billing_appt_type_id",
        using: "BTREE",
        fields: [
          { name: "appt_type_id" },
        ]
      },
      {
        name: "fk_billing_client_id",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "fk_billing_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
