import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ApptStatus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    apptStatusName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'appt_status_name'
    }
  }, {
    sequelize,
    tableName: 'appt_status',
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
