import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LabOrderZoetisRefLabOrder extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    labOrderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'lab_order',
        key: 'id'
      },
      field: 'lab_order_id'
    },
    orderNum: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'order_num'
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
    tableName: 'lab_order_zoetis_ref_lab_order',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "lab_order_order_id_idx",
        using: "BTREE",
        fields: [
          { name: "lab_order_id" },
        ]
      },
      {
        name: "fk_lab_order_zoetis_ref_lab_order_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
