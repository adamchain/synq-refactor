import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Estimate extends Model {
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
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'sub_total'
    },
    salesTax: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'sales_tax'
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
    priceVariance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'price_variance'
    },
    total: {
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
    }
  }, {
    sequelize,
    tableName: 'estimate',
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
        name: "estimate_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_estimate_client_id",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "fk_estimate_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
