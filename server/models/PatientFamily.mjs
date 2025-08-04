import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientFamily extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    familyName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'family_name'
    }
  }, {
    sequelize,
    tableName: 'patient_family',
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
