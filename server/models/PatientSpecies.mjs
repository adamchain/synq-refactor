import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientSpecies extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    familyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'family_id'
    },
    speciesName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'species_name'
    },
    speciesImage: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'species_image'
    },
    speciesJson: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'species_json'
    }
  }, {
    sequelize,
    tableName: 'patient_species',
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
