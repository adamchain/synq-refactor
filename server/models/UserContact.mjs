import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class UserContact extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'last_name'
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    license: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    isDoctor: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      field: 'is_doctor'
    },
    pay: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    takeAppt: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'take_appt'
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
    zip: {
      type: DataTypes.STRING(15),
      allowNull: true
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
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_contact',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "branch_id" },
        ]
      },
      {
        name: "user_user_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "user_user_status_id_idx",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
  }
}
