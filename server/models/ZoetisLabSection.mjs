import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ZoetisLabSection extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      },
      field: 'branch_id'
    },
    sectionName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'section_name'
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_date'
    }
  }, {
    sequelize,
    tableName: 'zoetis_lab_section',
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
        name: "lab_section_branch_id_idx",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
