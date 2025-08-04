import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ZoetisLabOrderOrphan extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id'
      },
      field: 'client_id'
    },
    practiceId: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'practice_id'
    },
    practiceRef: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'practice_ref'
    },
    laboratoryId: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'laboratory_id'
    },
    laboratoryRef: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'laboratory_ref'
    },
    ownerName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'owner_name'
    },
    ownerId: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'owner_id'
    },
    vetName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'vet_name'
    },
    vetId: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'vet_id'
    },
    animalId: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'animal_id'
    },
    animalName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'animal_name'
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    species: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    breed: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zoetis_lab_order_orphan',
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
        name: "fk_zoetis_lab_order_orphan_client_id",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
    ]
  });
  }
}
