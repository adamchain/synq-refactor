import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientSex extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    patientSexCd: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true,
      field: 'patient_sex_cd'
    },
    patientSexName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'patient_sex_name'
    },
    genderJson: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'gender_json'
    }
  }, {
    sequelize,
    tableName: 'patient_sex',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_sex_cd" },
        ]
      },
      {
        name: "patient_sex_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_sex_cd" },
        ]
      },
    ]
  });
  }
}
