import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientNumericAttr extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patientNumericAttrCd: {
      type: DataTypes.STRING(3),
      allowNull: false,
      field: 'patient_numeric_attr_cd'
    },
    patientNumericAttrName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'patient_numeric_attr_name'
    }
  }, {
    sequelize,
    tableName: 'patient_numeric_attr',
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
