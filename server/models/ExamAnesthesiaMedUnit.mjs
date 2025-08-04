import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ExamAnesthesiaMedUnit extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'exam_anesthesia_med_unit',
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
    ]
  });
  }
}
