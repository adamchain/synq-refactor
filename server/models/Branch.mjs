import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Branch extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    branchTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'branch_type_id'
    },
    orgId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'organization',
        key: 'id'
      },
      field: 'org_id'
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'state',
        key: 'id'
      },
      field: 'state_id'
    },
    zipCode: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'zip_code'
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tzId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'tz_id'
    },
    taxRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'tax_rate'
    },
    cashCheckoutDiscount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'cash_checkout_discount'
    },
    sTaxSFee: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 's_tax_s_fee'
    },
    statusId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'status_id'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'branch',
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
        name: "branch_tz_id_idx",
        using: "BTREE",
        fields: [
          { name: "tz_id" },
        ]
      },
      {
        name: "branch_org_id_idx",
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
      {
        name: "branch_state_id_idx",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
  }
}
