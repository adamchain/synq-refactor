import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientCategoricalAttr extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patientCategoricalAttrCd: {
      type: DataTypes.STRING(2),
      allowNull: false,
      field: 'patient_categorical_attr_cd'
    },
    patientCategoricalAttrName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'patient_categorical_attr_name'
    }
  }, {
    sequelize,
    tableName: 'patient_categorical_attr',
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
