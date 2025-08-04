import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Inventory extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
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
    inventoryType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'inventory_type'
    },
    itemCode: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'item_code'
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'category_id'
    },
    vendor: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    manufacturer: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'product_name'
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    retailMethod: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'retail_method'
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    markupPer: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'markup_per'
    },
    minPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'min_price'
    },
    maxPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'max_price'
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'service_fee'
    },
    salesTax: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'sales_tax'
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discountType: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'discount_type'
    },
    alterSex: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'alter_sex'
    },
    euthanasia: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    invoiceHide: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'invoice_hide'
    },
    invoiceComments: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'invoice_comments'
    },
    labVendor: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'lab_vendor'
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    customLabInputProperties: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'custom_lab_input_properties'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    showonwebsite: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    showprice: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    showduration: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    saveAppointment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'save_appointment'
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inventory',
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
        name: "inventory_inventory_branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
