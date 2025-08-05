import { Col, Row, Table, Typography, Button, Input } from "antd";
import React from "react";
import "./Estimate.scss";
import { TrashIcon, UserDecline } from "../../util/SvgUtil";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Title } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Service name",
    dataIndex: "name",
    key: "name",
    width: "60%",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: "10%",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    width: "4%",
    key: "qty",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: "13%",
  },
  {
    title: "Action",
    dataIndex: "",
    width: "13%",
    key: "action",
    render: () => {
      return (
        <span className="actions">
          <a className="customer-decline">
            <UserDecline />
          </a>
          <a>
            <TrashIcon />
          </a>
        </span>
      );
    },
  },
];

const data = [
  {
    key: 1,
    name: "Annual Wellness K9 Bloodwork (0-5 Yrs)",
    code: "LFLSL",
    qty: 1,
    price: "$200.00",
    children: [
      {
        key: 11,
        name: "HM5 Pack (CBC In-House)",
        code: "CBC",
        price: "$100.00",
        qty: 1,
      },
      {
        key: 12,
        name: "In-House Urinalysis",
        code: "UAIH",
        price: "$150.00",
        qty: 1,
      },
    ],
  },
  {
    key: 2,
    name: "Rabies Titer (FAVN to KS Lab)",
    code: "LKFAVN",
    price: "$50.00",
    qty: 1,
  },
];
// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
  hideSelectAll: true,
};

const EstimateTable = (props) => {
  return (
    <div>
      <Row>
        <Col span={17} className="table-title-top">
          <Title level={5}>Estimate</Title>
          <Text>Add Services</Text>
        </Col>
        <Col span={3}>
          <PrinterOutlined />
          <Text>Print</Text>
        </Col>
        <Col span={4}>
          <DownloadOutlined />
          <Text>Download</Text>
        </Col>
      </Row>
      <Row>
        <Search
          className="appointment-estimate-search"
          size="large"
          placeholder="Search Services to Add"
          onSearch={(value) => console.log(value)}
        />
      </Row>
      <Table
        className="estimate"
        columns={columns}
        pagination={false}
        bordered={true}
        footer={() => {
          return (
            <span className="sub-total">
              <Text strong>Subtotal</Text>
              <Text strong className="total-amount">
                $425.00
              </Text>
            </span>
          );
        }}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
      />
      <Row className="invoice">
        <Col span={12} className="invoice-summary">
          <Title level={5}>Invoice Summary</Title>
          <Text>Get your finalized invoice</Text>
          <Row className="sub-total-amount">
            <Col span={12}>
              <Text>Subtotal:</Text>
            </Col>
            <Col span={12} align="end">
              <Text>$425.00</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text>Sales Tax</Text>
            </Col>
            <Col span={12} align="end">
              $6.99
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text>Discount</Text>
            </Col>
            <Col span={12} align="end">
              Add Discount
            </Col>
          </Row>
        </Col>
        <Col span={12} className="total-due">
          <Row>
            <Col span={12}>
              <Text>Total Due</Text>
            </Col>
          </Row>
          <Row>
            <Title level={2}>$431.99</Title>
          </Row>
          <Row>
            <Button shape="round" size="large" className="pay-now">
              Pay Now
            </Button>
          </Row>
          <Row>
            <Button shape="round" size="large">
              Send Invoice
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EstimateTable;
