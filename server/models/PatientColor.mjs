import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientColor extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patientColorName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'patient_color_name'
    }
  }, {
    sequelize,
    tableName: 'patient_color',
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
