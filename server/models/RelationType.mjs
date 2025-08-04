import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class RelationType extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    relationTypeCd: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true,
      field: 'relation_type_cd'
    },
    relationTypeName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'relation_type_name'
    }
  }, {
    sequelize,
    tableName: 'relation_type',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "relation_type_cd" },
        ]
      },
      {
        name: "relation_type_cd_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "relation_type_cd" },
        ]
      },
    ]
  });
  }
}
