import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientStatus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patientStatusName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'patient_status_name'
    }
  }, {
    sequelize,
    tableName: 'patient_status',
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
    ]
  });
  }
}
