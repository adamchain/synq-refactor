import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ZoetisLabTest extends Model {
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
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'section_id'
    },
    testName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'test_name'
    },
    code: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    replicate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    validFrom: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'valid_from'
    },
    includes: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    nonDiscountable: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'non_discountable'
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_date'
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_date'
    }
  }, {
    sequelize,
    tableName: 'zoetis_lab_test',
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
        name: "lab_test_branch_id_idx",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "lab_test_lab_section_id_idx",
        using: "BTREE",
        fields: [
          { name: "section_id" },
        ]
      },
    ]
  });
  }
}
