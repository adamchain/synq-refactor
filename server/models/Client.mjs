import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Client extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
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
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING(50),
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
    sendEmail: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'send_email'
    },
    sendTxt: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'send_txt'
    },
    sendReminder: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'send_reminder'
    },
    taxExempt: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'tax_exempt'
    },
    clientAlert: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: 'client_alert'
    },
    statusCd: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "A",
      field: 'status_cd'
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    },
    orgId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'organization',
        key: 'id'
      },
      field: 'org_id'
    }
  }, {
    sequelize,
    tableName: 'client',
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
        name: "client_client_status_cd_idx",
        using: "BTREE",
        fields: [
          { name: "status_cd" },
        ]
      },
      {
        name: "client_created_by_idx",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "client_updated_by_idx",
        using: "BTREE",
        fields: [
          { name: "updated_by" },
        ]
      },
      {
        name: "client_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "client_state_id_idx",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
      {
        name: "fk_client_org_id",
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
    ]
  });
  }
}
