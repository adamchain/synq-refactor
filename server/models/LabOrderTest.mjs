import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LabOrderTest extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    labOrderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'lab_order',
        key: 'id'
      },
      field: 'lab_order_id'
    },
    inventoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'inventory',
        key: 'id'
      },
      field: 'inventory_id'
    },
    testName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'test_name'
    },
    testCode: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      field: 'test_code'
    },
    testType: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'test_type'
    },
    resultDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'result_date'
    },
    resultStatus: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'result_status'
    },
    resultNotes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'result_notes'
    },
    deviceId: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'device_id'
    },
    additionalMetadata: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'additional_metadata'
    }
  }, {
    sequelize,
    tableName: 'lab_order_test',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "lab_order_id" },
          { name: "test_code" },
        ]
      },
      {
        name: "fk_lab_order_test_inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
  }
}
