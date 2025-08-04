import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ExamFreeformMeasurement extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    examId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'exam',
        key: 'id'
      },
      field: 'exam_id'
    },
    propId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'prop_id'
    },
    value: {
      type: DataTypes.STRING(15000),
      allowNull: true
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
    tableName: 'exam_freeform_measurement',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "exam_id" },
          { name: "prop_id" },
        ]
      },
      {
        name: "fk_exam_freeform_measurement_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
