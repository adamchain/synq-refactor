import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BillingStatus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'billing_status',
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
