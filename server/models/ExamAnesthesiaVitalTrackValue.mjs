import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ExamAnesthesiaVitalTrackValue extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    trackId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'track_id'
    },
    propId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true,
      field: 'prop_id'
    },
    value: {
      type: DataTypes.STRING(25),
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
    tableName: 'exam_anesthesia_vital_track_value',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "track_id" },
          { name: "prop_id" },
        ]
      },
      {
        name: "exam_anesthesia_vital_track_value_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
