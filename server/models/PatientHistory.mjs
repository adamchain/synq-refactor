import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientHistory extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'provider_id'
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    qty: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    declined: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'patient_history',
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
        name: "fk_patient_history_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "fk_patient_history_client_id",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "fk_patient_history_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
