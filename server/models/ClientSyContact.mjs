import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ClientSyContact extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
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
    tableName: 'client_sy_contact',
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
        name: "client_sy_contact_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
