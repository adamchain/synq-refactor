import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PatientBreed extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    familyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'family_id'
    },
    breedName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'breed_name'
    },
    breedImage: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'breed_image'
    },
    breedJson: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'breed_json'
    }
  }, {
    sequelize,
    tableName: 'patient_breed',
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
        name: "breed_species_id_idx",
        using: "BTREE",
        fields: [
          { name: "family_id" },
        ]
      },
    ]
  });
  }
}
