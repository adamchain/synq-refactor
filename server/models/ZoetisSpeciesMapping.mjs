import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ZoetisSpeciesMapping extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    speciesName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'species_name'
    },
    zoetisSpeciesName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'zoetis_species_name'
    }
  }, {
    sequelize,
    tableName: 'zoetis_species_mapping',
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
