import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Payment extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    paymentMethod: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'payment_method'
    },
    isWritein: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'is_writein'
    },
    paymentCardType: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'payment_card_type'
    },
    paymentCardSubtype: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'payment_card_subtype'
    },
    statusId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'status_id'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    tip: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    text: {
      type: DataTypes.JSON,
      allowNull: true
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'payment_date'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by'
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_date'
    }
  }, {
    sequelize,
    tableName: 'payment',
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
        name: "fk_payment_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
