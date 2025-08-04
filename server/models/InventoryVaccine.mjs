import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class InventoryVaccine extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    isRabies: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'is_rabies'
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'type_id'
    },
    dose: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expiry_date'
    },
    serial: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    lot: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    lotExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'lot_expiration_date'
    },
    usdaLicensing: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'usda_licensing'
    },
    animalControlLicensing: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'animal_control_licensing'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    }
  }, {
    sequelize,
    tableName: 'inventory_vaccine',
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
        name: "inventory_vaccine_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
