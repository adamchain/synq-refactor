import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ApptType extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    apptTypeName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'appt_type_name'
    },
    apptLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'appt_length'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'is_deleted'
    }
  }, {
    sequelize,
    tableName: 'appt_type',
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
