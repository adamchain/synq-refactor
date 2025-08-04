import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ClientPhone extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'client',
        key: 'id'
      },
      field: 'client_id'
    },
    phoneNbr: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'phone_nbr'
    },
    phoneTypeCd: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true,
      field: 'phone_type_cd'
    },
    isPreferred: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'is_preferred'
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
    tableName: 'client_phone',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "client_id" },
          { name: "phone_type_cd" },
        ]
      },
      {
        name: "client_phone_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
