import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Card,
  Statistic,
  DatePicker,
  Space,
  Typography,
  Layout,
  Select,
  Button,
  Row,
  Tooltip,
  Col,
  Tag,
  Divider,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import AdvancedTable from "../../../generic-components/advanced-table/AdvancedTable";
import { CommonContext } from "../../../../context/CommonContext";
import ReportServices from "../../../../services/ReportServices";
import { localToUtc, momentLocal } from "../../../util/TimeUtil";
import CommonUtil from "../../../util/CommonUtil";
//import { DownloadIcon, InvProceduresIcon, SendtoCloud, TrashIcon } from '../util/SvgUtil';
import {
  ArrowLeftOutlined,
  CloudDownloadOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { TotalRevenue } from "../../ReportsComponent/TotalRevenue";
import { StaffReport } from "../../ReportsComponent/StaffReport";
import { InventoryReport } from "../../ReportsComponent/InventoryReport";
import {
  ClientActive,
  ClientCardIcon1,
  ClientInactive,
  DownloadIcon,
  TrashIcon,
  VaccineIcon,
} from "../../../util/SvgUtil";
import { NumberCard } from "../CommonComponent/NumberCard";
import { BarCard } from "../CommonComponent/BarCard";
import { DoubleLineCard } from "../CommonComponent/DoubleLineCard";
import ClientServices from "../../../../services/ClientServices";
import InventoryServices from "../../../../services/InventoryServices";
import PriceUtil from "../../../util/PriceUtil";

const { Content } = Layout;
const { Text, Link } = Typography;
const dateFormat = "MM/DD/YYYY";
const { RangePicker } = DatePicker;

const customStringFilter = (searchValue, currentValue) =>
  currentValue
    ? currentValue.toString().toLowerCase().includes(searchValue.toLowerCase())
    : "";

const ServiceView = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const context = useContext(CommonContext);
  const [dashItemsObject, setDashItemsObject] = useState({
    I: 0,
    P: 0,
    LD: 0,
    LOOS: 0,
    selectedDash: "P",
  });

  let allStates = context.allStates;
  useEffect(() => {
    ClientServices.getAllClients(setData);
  }, []);

  const filterTableData = (selectedDash, tableData = []) => {
    if (selectedDash === "I") {
      console.log(
        "Invdata---",
        tableData.filter((k) => [1].includes(parseInt(k.inventoryType))),
      );
      return tableData.filter((k) => [1].includes(parseInt(k.inventoryType)));
    } else if (selectedDash === "P") {
      return tableData.filter((k) => [2].includes(parseInt(k.inventoryType)));
    } else if (selectedDash === "LD") {
      return tableData.filter((k) =>
        [3, 4].includes(parseInt(k.inventoryType)),
      );
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useImperativeHandle(ref, () => ({
    export: exportToCSV,
    exportExcel: exportToExcel,
  }));

  const SERVICE_TYPE = {
    1: "Inventory",
    2: context.defaultBranch.branchTypeId == 2 ? "Service" : "Procedure",
    3: "Internal Lab",
    4: "External Lab",
    5: "Package",
  };

  const fetchInventory = (url) => {
    ReportServices.getInventoryNew(url, (data) => {
      let dashCounts = { I: 0, P: 0, LD: 0, LOOS: 0 };
      data.forEach((k) => {
        dashCounts["I"] =
          dashCounts["I"] + ([1].includes(parseInt(k.inventoryType)) ? 1 : 0);
        dashCounts["P"] =
          dashCounts["P"] + ([2].includes(parseInt(k.inventoryType)) ? 1 : 0);
        dashCounts["LD"] =
          dashCounts["LD"] +
          ([3, 4].includes(parseInt(k.inventoryType)) ? 1 : 0);
      });
      setDashItemsObject((k) => ({ ...k, ...dashCounts }));
      setData(data);
    });
  };

  const calculateColumnTotal = (data, key) => {
    return data.reduce((total, record) => total + (record[key] || 0), 0);
  };

  const exportToExcel = () => {
    console.log("inside exportToExcel");

    import("xlsx").then((xlsx) => {
      // Process the data with any necessary filters applied
      const filteredData = filterTableData("P", data);

      // Create a new array for processed rows
      const processedData = filteredData.map((row) => {
        const processedRow = {};

        // Map through columns to format each field
        columns.forEach((col) => {
          const dataIndex = Array.isArray(col.dataIndex)
            ? col.dataIndex
            : [col.dataIndex];

          // Extract and process nested fields
          const value = dataIndex.reduce((acc, key) => {
            if (key === "inventoryType") {
              return acc && acc[key] !== undefined
                ? SERVICE_TYPE[acc[key]]
                : "";
            }
            if (key == "status") {
              return acc && acc[key] !== undefined
                ? acc[key] == "Y"
                  ? "Active"
                  : "Inactive"
                : "";
            }
            if (key === "createdTime") {
              return acc && momentLocal(acc[key]).format("YYYY-MM-DD");
            } else {
              return acc && acc[key] !== undefined ? acc[key] : ""; // Safe access
            }
          }, row);

          // Assign processed value to the corresponding column title
          processedRow[col.title] = value !== undefined ? value : "";
        });

        return processedRow; // Return the processed row
      });

      // Create a worksheet from the processed data
      const worksheet = xlsx.utils.json_to_sheet(processedData);

      // Create a new workbook and append the worksheet
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

      // Write the Excel file
      xlsx.writeFile(workbook, "service_data.xlsx");
    });
  };

  const exportToCSV = () => {
    // Extract headers based on column titles
    const headers = columns
      .map((col) => col.title) // Extract column titles for the header row
      .join(",");

    // Extract data rows and handle nested fields correctly
    const rows = filterTableData("P", data)
      .map(
        (row) =>
          columns
            .map((col) => {
              // Check if dataIndex is an array or a string
              const dataIndex = Array.isArray(col.dataIndex)
                ? col.dataIndex
                : [col.dataIndex];

              // Extract the value from the nested object/array
              const value = dataIndex.reduce((acc, key) => {
                if (key == "inventoryType")
                  return acc && acc[key] !== undefined
                    ? SERVICE_TYPE[acc[key]]
                    : "";
                if (key == "status")
                  return acc && acc[key] !== undefined
                    ? acc[key] == "Y"
                      ? "Active"
                      : "Inactive"
                    : "";
                if (key === "createdTime") {
                  return acc && momentLocal(acc[key]).format("YYYY-MM-DD");
                } else return acc && acc[key] !== undefined ? acc[key] : ""; // Safe data access
              }, row);

              // Return value as string, safely
              return value !== undefined ? `"${value}"` : "";
            })
            .join(","), // Join the values for this row with commas
      )
      .join("\n"); // Join all rows with a newline

    // Create CSV content
    const csvContent = `${headers}\n${rows}`;

    // Create Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "service_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdTime",
      sorter: (a, b) => {
        return momentLocal(a.createdTime, "YYYY-MM-DD").diff(
          momentLocal(b.createdTime, "YYYY-MM-DD"),
        );
      },
      render: (text) => momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
      width: 100,
      fixed: "left",
    },
    {
      title: "Product",
      dataIndex: "productName",
      width: 150,
      isSearchRequired: true,
    },
    {
      title: "Code",
      dataIndex: "itemCode",
      width: 50,
      render: (text) => <Text> {text ? text : "-"}</Text>,
      isSearchRequired: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 150,
      isSearchRequired: true,
    },
    {
      title: "Type",
      dataIndex: "inventoryType",
      width: 65,
      render: (text) => SERVICE_TYPE[text] ?? "Unknown",
    },
    {
      title: "Service Fee",
      dataIndex: "serviceFee",
      width: 55,
      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: 50,
      sorter: (a, b) => a.cost - b.cost,
      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 50,
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => {
        if (record.originalPrice !== text) {
          return (
            <>
              <Row>
                <Col>
                  <Text> {PriceUtil.dollarValue(text)}</Text>
                </Col>
              </Row>
              {/* <Row><Col><Text style={{"textDecoration": "line-through"}}> {PriceUtil.dollarValue(record.originalPrice)}</Text></Col></Row> */}
            </>
          );
        } else {
          return <Text> {PriceUtil.dollarValue(text)}</Text>;
        }
      },
    },

    {
      title: "On Hand",
      dataIndex: "onHand",
      width: 45,
      render: (text) => (
        <Text
          style={{
            color:
              text <= 0
                ? "red"
                : dashItemsObject.selectedDash === "LOOS"
                  ? "#F59A23"
                  : "",
            fontWeight:
              text <= 0 || dashItemsObject.selectedDash === "LOOS"
                ? "bold"
                : "",
          }}
        >
          {" "}
          {text}{" "}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",

      width: 50,
      render: (text) => (
        <Tag
          style={{ width: "90px", textAlign: "center" }}
          color={text == "Y" ? "green" : "red"}
        >
          {text == "Y" ? "Active" : "Inactive"}
        </Tag>
      ),

      onFilter: (value, record) =>
        (record["status"] == "Y" ? "Active" : "Inactive")
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      filters: [
        {
          text: "Active",
          value: "Y",
        },
        {
          text: "Inactive",
          value: "N",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <Content className="masterContentPadding scollerMaster">
      <Row style={{ padding: 20 }}>
        <Col lg={24} md={24} sm={24}>
          <Card
            className="pageCardContainer"
            title="Services"
            bordered={false}
            extra={
              <>
                <RangePicker
                  format={dateFormat}
                  onChange={(value) => {
                    if (!value) {
                      fetchInventory();
                    } else {
                      const startDate = localToUtc(value[0]).format(
                        "YYYY-MM-DD",
                      );
                      const endDate = localToUtc(value[1]).format("YYYY-MM-DD");
                      fetchInventory(
                        `?filterType=custom&startDate=${startDate}&endDate=${endDate}`,
                      );
                    }
                  }}
                />
              </>
            }
          >
            <AdvancedTable
              dataSource={filterTableData("P", data)}
              columns={columns}
              scroll={{ x: 1600, y: "calc(100vh - 450px)" }}
              rowKey="id"
              className="inventoryListTable"
              summary={() => {
                const totalServiceFee = calculateColumnTotal(
                  filterTableData("P", data),
                  "serviceFee",
                );
                const totalCost = calculateColumnTotal(
                  filterTableData("P", data),
                  "cost",
                );
                const totalPrice = calculateColumnTotal(
                  filterTableData("P", data),
                  "price",
                );
                const totalOnHand = calculateColumnTotal(
                  filterTableData("P", data),
                  "onHand",
                );

                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5}>
                      <Text strong>Grand Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text strong>
                        {PriceUtil.dollarValue(totalServiceFee)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text strong>{PriceUtil.dollarValue(totalCost)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <Text strong>{PriceUtil.dollarValue(totalPrice)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      <Text strong>{totalOnHand}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
});

export default ServiceView;
