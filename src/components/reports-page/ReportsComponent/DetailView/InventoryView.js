import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Table,
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
  InvIcon,
  LabIcon,
  StockIcon,
  TrashIcon,
  VaccineIcon,
} from "../../../util/SvgUtil";
import { NumberCard } from "../CommonComponent/NumberCard";
import { BarCard } from "../CommonComponent/BarCard";
import { DoubleLineCard } from "../CommonComponent/DoubleLineCard";
import ClientServices from "../../../../services/ClientServices";
import { Bar2Card } from "../CommonComponent/Bar2Card";
import StaffServices from "../../../../services/StaffServices";
import { Bar3Card } from "../CommonComponent/Bar3Card";
import StockChart from "../CommonComponent/StockChart";
import InventoryServices from "../../../../services/InventoryServices";
import PatientServices from "../../../../services/PatientServices";
import PriceUtil from "../../../util/PriceUtil";

const { Content } = Layout;
const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const currentDate = momentLocal;
const dateFormat = "MM/DD/YYYY";

const customStringFilter = (searchValue, currentValue) =>
  currentValue
    ? currentValue.toString().toLowerCase().includes(searchValue.toLowerCase())
    : "";

const calculateColumnTotal = (data, key) => {
  return data.reduce((total, record) => total + (record[key] || 0), 0);
};

const InventoryView = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [activeCard, setActiveCard] = useState("inv");
  const [invData, setInvData] = useState([]);
  const [stockData, setStockData] = useState({});
  const commonContext = useContext(CommonContext);
  const [dashItemsObject, setDashItemsObject] = useState({
    I: 0,
    P: 0,
    LD: 0,
    LOOS: 0,
    selectedDash: "I",
  });
  const [cardFilters, setCardFilters] = useState({
    barCard1: props.cardFilters,
    barCard2: props.cardFilters,
    stockCard: props.cardFilters,
  });
  const [dates, setDates] = useState({
    startDate: props.startDate ? props.startDate : currentDate(),
    endDate: props.endDate ? props.endDate : currentDate(),
  });

  useImperativeHandle(ref, () => ({
    export: exportToCSV,
    exportExcel: exportToExcel,
  }));

  useEffect(() => {
    //fetchInventory('?filterType=yearly&year='+new Date().getFullYear());
    fetchInventory();
  }, []);

  useEffect(() => {
    setCardFilters({
      barCard1: props.cardFilters,
      barCard2: props.cardFilters,
      stockCard: props.cardFilters,
    });
  }, [props.cardFilters]);

  useEffect(() => {
    if (cardFilters.barCard1 !== null && cardFilters.barCard1 !== undefined) {
      let isMounted2 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.invRetrive(
            props.selectedFilter.toLowerCase(),
            cardFilters.barCard1,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setInvData(data.inventoryData);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.invRetrive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.barCard1,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setInvData(data.inventoryData);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.invRetrive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.barCard1,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setInvData(data.inventoryData);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.invRetrive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted2) {
                setInvData(data.inventoryData);
              }
            },
          );
        }
      };
      fetchData();

      return () => {
        isMounted2 = false;
      };
    }
  }, [
    props.selectedFilter,
    cardFilters.barCard1,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (cardFilters.stockCard !== null && cardFilters.stockCard !== undefined) {
      let isMounted4 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.invDesc(
            props.selectedFilter.toLowerCase(),
            cardFilters.stockCard,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setStockData(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.invDesc(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.stockCard,
            0,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setStockData(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.invDesc(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.stockCard,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setStockData(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.invDesc(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted4) {
                setStockData(data);
              }
            },
          );
        }
      };
      fetchData();

      return () => {
        isMounted4 = false;
      };
    }
  }, [
    props.selectedFilter,
    cardFilters.stockCard,
    dates.startDate,
    dates.endDate,
  ]);

  const handleDateChange = (value) => {
    setDates({
      startDate: value ? value[0] : currentDate(),
      endDate: value ? value[1] : currentDate(),
    });
    console.log("testt--", value);
  };

  const handleFilterChange = (cardKey, value) => {
    setCardFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [cardKey]: value };
      return newFilters;
    });
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
        if ([1].includes(parseInt(k.inventoryType))) {
          let aqty =
            k.alertQty === 0
              ? 0
              : k.alertQty
                ? k.onHand <= k.alertQty
                : k.onHand <= commonContext.defaultBranch.inventoryAlert;
          dashCounts["LOOS"] =
            dashCounts["LOOS"] +
            ((k.statusBoolean === true && aqty) ||
            (k.onHand
              ? false
              : [1].includes(parseInt(k.inventoryType))
                ? true
                : false)
              ? 1
              : 0);
        }
      });
      setDashItemsObject((k) => ({ ...k, ...dashCounts }));
      setData(data);
    });
  };

  const filterTableData = (selectedDash, tableData = []) => {
    if (selectedDash === "I") {
      return tableData.filter((k) => [1].includes(parseInt(k.inventoryType)));
    } else if (selectedDash === "P") {
      return tableData.filter((k) => [2].includes(parseInt(k.inventoryType)));
    } else if (selectedDash === "LD") {
      return tableData.filter((k) =>
        [3, 4].includes(parseInt(k.inventoryType)),
      );
    } else if (selectedDash === "LOOS") {
      return tableData.filter((k) => {
        if ([1].includes(parseInt(k.inventoryType))) {
          let aqty =
            k.alertQty === 0
              ? 0
              : k.alertQty
                ? k.onHand <= k.alertQty
                : k.onHand <= commonContext.defaultBranch.inventoryAlert;
          return (k.statusBoolean === true && aqty) ||
            (k.onHand
              ? false
              : [1].includes(parseInt(k.inventoryType))
                ? true
                : false)
            ? true
            : false;
        }
      });
    }
  };

  const SERVICE_TYPE = {
    1: "Inventory",
    2: commonContext.defaultBranch.branchTypeId == 2 ? "Service" : "Procedure",
    3: "Internal Lab",
    4: "External Lab",
    5: "Package",
  };

  const exportToExcel = () => {
    console.log("inside exportToExcel");
    import("xlsx").then((xlsx) => {
      // Create a new array for processed rows
      const processedData = filterTableData("I", data).map((row) => {
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
      xlsx.writeFile(workbook, "inv_data.xlsx");
    });
  };

  const exportToCSV = () => {
    // Extract headers based on column titles
    const headers = columns
      .map((col) => col.title) // Extract column titles for the header row
      .join(",");

    // Extract data rows and handle nested fields correctly
    const rows = filterTableData("I", data)
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
                if (key == "status") {
                  return acc && acc[key] !== undefined
                    ? acc[key] == "Y"
                      ? "Active"
                      : "Inactive"
                    : "";
                }
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
    link.setAttribute("download", "inv_data.csv");
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
        (record["statusBoolean"] == "Y" ? "Active" : "Inactive")
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      onFilter: (value, record) => record.statusBoolean === value,
    },
  ];

  return (
    <Content className="masterContentPadding scollerMaster">
      {props.selectedFilter == "Custom" && (
        <Row justify="end">
          <RangePicker
            defaultValue={[dates.startDate, dates.endDate]}
            onChange={handleDateChange}
            className="ant-btn-lg"
            style={{ background: "#fff" }}
          />
        </Row>
      )}
      <div style={{ padding: 20 }}>
        <Row gutter={[16, 16]}>
          <Col sm={24} xl={12} xxl={12}>
            <Bar3Card
              onClick={() => {
                setActiveCard("inv");
                fetchInventory();
              }}
              onFilterChange={(value) => handleFilterChange("barCard1", value)}
              data={invData}
              selectedFilter={props.selectedFilter}
              icon={InvIcon}
              title={"Inventory"}
              count={"-12"}
              subtext={"in this month"}
              cardClass={"cardOne"}
            />
          </Col>
          <Col sm={24} xl={12} xxl={12}>
            <StockChart
              onClick={() => {
                setActiveCard("stock");
                fetchInventory();
              }}
              onFilterChange={(value) => handleFilterChange("stockCard", value)}
              data={stockData}
              selectedFilter={props.selectedFilter}
              icon={StockIcon}
              title={"Low / Out of Stock"}
              stats={"360"}
              count={"+12"}
              subtext={"in this month"}
              cardClass={"cardOne"}
            />
          </Col>
        </Row>
      </div>
      <Row style={{ padding: 20 }}>
        <Col lg={24} md={24} sm={24}>
          {activeCard == "inv" && (
            <Card
              className="pageCardContainer"
              title="Inventory"
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
                        const endDate = localToUtc(value[1]).format(
                          "YYYY-MM-DD",
                        );
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
                dataSource={filterTableData("I", data)}
                columns={columns}
                scroll={{ x: 1600, y: "calc(100vh - 450px)" }}
                rowKey="id"
                className="inventoryListTable"
                summary={() => {
                  const totalServiceFee = calculateColumnTotal(
                    filterTableData("I", data),
                    "serviceFee",
                  );
                  const totalCost = calculateColumnTotal(
                    filterTableData("I", data),
                    "cost",
                  );
                  const totalPrice = calculateColumnTotal(
                    filterTableData("I", data),
                    "price",
                  );
                  const totalOnHand = calculateColumnTotal(
                    filterTableData("I", data),
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
          )}
          {activeCard == "lab" && (
            <Card
              className="pageCardContainer"
              title="Lab"
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
                        const endDate = localToUtc(value[1]).format(
                          "YYYY-MM-DD",
                        );
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
                dataSource={filterTableData("LD", data)}
                columns={columns}
                scroll={{ x: 1600, y: "calc(100vh - 450px)" }}
                rowKey="id"
                className="inventoryListTable"
                summary={() => {
                  const totalServiceFee = calculateColumnTotal(
                    filterTableData("LD", data),
                    "serviceFee",
                  );
                  const totalCost = calculateColumnTotal(
                    filterTableData("LD", data),
                    "cost",
                  );
                  const totalPrice = calculateColumnTotal(
                    filterTableData("LD", data),
                    "price",
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
                    </Table.Summary.Row>
                  );
                }}
              />
            </Card>
          )}
          {activeCard == "stock" && (
            <Card
              className="pageCardContainer"
              title="Low / Out of Stock"
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
                        const endDate = localToUtc(value[1]).format(
                          "YYYY-MM-DD",
                        );
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
                dataSource={filterTableData("LOOS", data)}
                columns={columns}
                scroll={{ x: 1600, y: "calc(100vh - 450px)" }}
                rowKey="id"
                className="inventoryListTable"
                summary={() => {
                  const totalServiceFee = calculateColumnTotal(
                    filterTableData("LOOS", data),
                    "serviceFee",
                  );
                  const totalCost = calculateColumnTotal(
                    filterTableData("LOOS", data),
                    "cost",
                  );
                  const totalPrice = calculateColumnTotal(
                    filterTableData("LOOS", data),
                    "price",
                  );
                  const totalOnHand = calculateColumnTotal(
                    filterTableData("LOOS", data),
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
          )}
        </Col>
      </Row>
    </Content>
  );
});

export default InventoryView;
