import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ZoetisLabOrderTestItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    labOrderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'lab_order',
        key: 'id'
      },
      field: 'lab_order_id'
    },
    testCode: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'test_code'
    },
    analyteCode: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'analyte_code'
    },
    analyteName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'analyte_name'
    },
    result: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    resultText: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'result_text'
    },
    units: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    lowRange: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'low_range'
    },
    highRange: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'high_range'
    },
    extremeLowRange: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'extreme_low_range'
    },
    extremeHighRange: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'extreme_high_range'
    },
    pathologistName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'pathologist_name'
    },
    pathologistTitle: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'pathologist_title'
    },
    notes: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zoetis_lab_order_test_item',
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
        name: "lab_order_test_item_order_id_idx",
        using: "BTREE",
        fields: [
          { name: "lab_order_id" },
        ]
      },
    ]
  });
  }
}
