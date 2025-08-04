import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientWeight extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    patientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
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
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unitId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'unit_id'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'patient_weight',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "created_time" },
        ]
      },
      {
        name: "patient_weight_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "patient_weight_unit_cd_idx",
        using: "BTREE",
        fields: [
          { name: "unit_id" },
        ]
      },
    ]
  });
  }
}
