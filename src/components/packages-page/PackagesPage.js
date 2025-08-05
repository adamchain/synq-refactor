import React, { useContext, useEffect, useState } from "react";
import WhskrPageHeader from "../page-header/WhskrPageHeader";

import { Button, Card, Col, Layout, Popconfirm, Row, Typography } from "antd";

import { EditIcon, TrashIcon } from "../util/SvgUtil";

import { CommonContext } from "../../context/CommonContext";
import PriceUtil from "../util/PriceUtil";
import PackageServices from "./../../services/PackageServices";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import PackageCreateEditDrawer from "./PackageCreateEditDrawer";

const { Content } = Layout;
const { Text, Link } = Typography;

const PackagesPage = () => {
  const context = useContext(CommonContext);

  const [packages, setPackages] = useState({});
  const [showRows, setShowRows] = useState([]);
  const [packageDrawerObject, setPackageDrawerObject] = useState(null);

  const refreshPackages = () => {
    setShowRows([]);
    PackageServices.getAllPackages((data) =>
      setPackages(
        data.reduce((total, current) => {
          total[current.id] = current;
          return total;
        }, {}),
      ),
    );
  };

  const refreshItems = (id) => {
    PackageServices.getPackageById(id, (data) => {
      setPackages((k) => ({ ...k, [id]: { ...k[id], items: data.items } }));
    });
  };
  const onPackageEdit = (id) => {
    PackageServices.getPackageById(id, (data) => {
      setPackageDrawerObject({ isEdit: true, data });
    });
  };

  const onDeletePackage = (id) => {
    PackageServices.deletePackage(id, refreshPackages);
  };
  useEffect(() => {
    refreshPackages();
  }, []);

  const columns = [
    {
      title: "Package Name",
      dataIndex: "name",
      isSearchRequired: true,
      sorter: true,
    },
    {
      title: "Package Code",
      dataIndex: "code",
      width: 170,
    },
    {
      title: "Items",
      dataIndex: "count",
      width: 100,
    },
    {
      title: "Price",
      dataIndex: "total",
      width: 130,

      sorter: true,
      render: (text, record) => (
        <Text>
          {" "}
          {PriceUtil.dollarValue(record.packageAdjustedPrice || text)}
        </Text>
      ),
    },
    {
      title: "Actions",
      dataIndex: "operation",
      fixed: "right",
      width: 160,
      render: (_, record) => {
        return (
          <Row gutter={[16, 0]}>
            <Col>
              <Typography.Link
                onClick={() => {
                  onPackageEdit(record.id);
                }}
              >
                <EditIcon />
              </Typography.Link>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure you want to delete this package?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDeletePackage(record.id)}
              >
                <Link>
                  <TrashIcon />
                </Link>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];
  const SERVICE_TYPE = {
    1: "Inventory",
    2: context.defaultBranch.branchTypeId == 2 ? "Service" : "Procedure",
    3: "Internal Lab",
    4: "External Lab",
    5: "Package",
  };

  const secondaryColumns = [
    {
      title: "Item Type",
      dataIndex: "type",
      sorter: true,
      render: (text) => SERVICE_TYPE[text] ?? "Unknown",
    },
    {
      title: "Category",
      dataIndex: "code",
      sorter: true,
    },
    {
      title: "Product",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: true,
    },
  ];
  // const mergedColumns = columns.map((col) => {
  //     if (!col.editable) {
  //         return col;
  //     }

  //     return {
  //         ...col,
  //         onCell: (record) => ({
  //             record,
  //             inputType: col.dataIndex === 'onhand' ? 'number' : 'text',
  //             dataIndex: col.dataIndex,
  //             title: col.title,
  //             editing: isEditing(record),
  //         }),
  //     };
  // });
  return (
    <Layout>
      <WhskrPageHeader title="Package Manager" buttonName="Create New" />
      <Content className="masterContentPadding scollerMaster">
        <Row>
          <Col span={24}>
            <Card
              className="pageCardContainer"
              title="Packages"
              bordered={false}
              extra={
                <Button
                  type="primary"
                  size="small"
                  ghost
                  shape="round"
                  onClick={() => {
                    setPackageDrawerObject({ isEdit: false });
                  }}
                >
                  Create Package
                </Button>
              }
            >
              <AdvancedTable
                dataSource={Object.values(packages)}
                columns={columns}
                scroll={{ x: 1500, y: "calc(100vh - 370px)" }}
                expandable={{
                  expandedRowRender: (record) => (
                    <AdvancedTable
                      rowKey="code"
                      columns={secondaryColumns}
                      dataSource={record.items ?? []}
                    />
                  ),
                  rowExpandable: () => true,
                  expandedRowKeys: showRows,
                  onExpandedRowsChange: setShowRows,
                }}
                onExpand={(expanded, record) =>
                  expanded ? refreshItems(record.id) : {}
                }
                rowKey="id"
              />
            </Card>
          </Col>
        </Row>
      </Content>
      {packageDrawerObject && (
        <PackageCreateEditDrawer
          data={packageDrawerObject.data}
          isEdit={packageDrawerObject.isEdit}
          onClose={() => setPackageDrawerObject(null)}
          onSuccess={() => {
            refreshPackages();
            setPackageDrawerObject(null);
          }}
        />
      )}
    </Layout>
  );
};

export default PackagesPage;
