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
  RevenueIcon,
  ServiceIcon,
  StaffCardIcon,
  TrashIcon,
  VaccineIcon,
} from "../../../util/SvgUtil";
import { NumberCard } from "../CommonComponent/NumberCard";
import { BarCard } from "../CommonComponent/BarCard";
import { DoubleLineCard } from "../CommonComponent/DoubleLineCard";
import ClientServices from "../../../../services/ClientServices";
import { Bar2Card } from "../CommonComponent/Bar2Card";
import StaffServices from "../../../../services/StaffServices";
import { CardHeader } from "../CommonComponent/CardHeader";
import PriceUtil from "../../../util/PriceUtil";

const { Content } = Layout;
const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const currentDate = momentLocal;

const customStringFilter = (searchValue, currentValue) =>
  currentValue
    ? currentValue.toString().toLowerCase().includes(searchValue.toLowerCase())
    : "";

const StaffView = forwardRef((props, ref) => {
  const [dataAppt, setDataAppt] = useState([]);
  const [data, setData] = useState([]);
  const [datastaff, setDatastaff] = useState([]);
  const context = useContext(CommonContext);
  const [apptCount, setApptCount] = useState({});
  const [cardFilters, setCardFilters] = useState({
    numberCard1: props.cardFilters,
    barCard1: props.cardFilters,
    barCard2: props.cardFilters,
    tableData: props.cardFilters,
  });
  const [dates, setDates] = useState({
    startDate: props.startDate ? props.startDate : currentDate(),
    endDate: props.endDate ? props.endDate : currentDate(),
  });

  //   let allStates = context.allStates;
  //   useEffect(()=>{
  //         ReportServices.totalDocAppt(props.selectedFilter.toLowerCase(),2024,0,0,null,null,(data)=>{
  //             setData(data)
  //         });
  //   },[props.selectedFilter]);

  useImperativeHandle(ref, () => ({
    export: exportToCSV,
    exportExcel: exportToExcel,
  }));

  useEffect(() => {
    setCardFilters({
      numberCard1: props.cardFilters,
      barCard1: props.cardFilters,
      barCard2: props.cardFilters,
      tableData: props.cardFilters,
    });
  }, [props.cardFilters]);

  useEffect(() => {
    if (
      cardFilters.numberCard1 !== null &&
      cardFilters.numberCard1 !== undefined
    ) {
      let isMounted2 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.apptStats(
            props.selectedFilter.toLowerCase(),
            cardFilters.numberCard1,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setApptCount(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.apptStats(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.numberCard1,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setApptCount(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.apptStats(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard1,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setApptCount(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.apptStats(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted2) {
                setApptCount(data);
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
    cardFilters.numberCard1,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (cardFilters.barCard2 !== null && cardFilters.barCard2 !== undefined) {
      let isMounted2 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.doctorRevenue(
            props.selectedFilter.toLowerCase(),
            cardFilters.barCard2,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setDatastaff(data.revenues);
                console.log("data--", data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.doctorRevenue(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.barCard2,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setDatastaff(data.revenues);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.doctorRevenue(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.barCard2,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setDatastaff(data.revenues);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.doctorRevenue(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted2) {
                setDatastaff(data.revenues);
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
    cardFilters.barCard2,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (cardFilters.barCard1 !== null && cardFilters.barCard1 !== undefined) {
      let isMounted4 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.appointmentReport(
            props.selectedFilter.toLowerCase(),
            cardFilters.barCard1,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setDataAppt(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.appointmentReport(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.barCard1,
            0,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setDataAppt(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.appointmentReport(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.barCard1,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setDataAppt(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.appointmentReport(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted4) {
                setDataAppt(data);
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
    cardFilters.barCard1,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (cardFilters.tableData !== null && cardFilters.tableData !== undefined) {
      let isMounted2 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.totalDocAppt(
            props.selectedFilter.toLowerCase(),
            cardFilters.tableData,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setData(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.totalDocAppt(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.tableData,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setData(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.totalDocAppt(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.tableData,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setData(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.totalDocAppt(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted2) {
                setData(data);
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
    cardFilters.tableData,
    dates.startDate,
    dates.endDate,
  ]);

  const handleFilterChange = (cardKey, value) => {
    setCardFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [cardKey]: value };
      return newFilters;
    });
  };

  const handleDateChange = (value) => {
    setDates({
      startDate: value ? value[0] : currentDate(),
      endDate: value ? value[1] : currentDate(),
    });
  };

  const exportToCSV = () => {
    // Extract headers based on column titles
    const headers = columns.map((col) => col.title).join(",");

    const rows = data?.appointments
      .map((row) =>
        columns
          .map((col) => {
            const dataIndex = Array.isArray(col.dataIndex)
              ? col.dataIndex
              : [col.dataIndex];

            const value = dataIndex.reduce((acc, key) => {
              return acc && acc[key] !== undefined ? acc[key] : ""; // Safe data access
            }, row);

            return value !== undefined ? `"${value}"` : "";
          })
          .join(","),
      )
      .join("\n");

    // Create CSV content
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "staff_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    import("xlsx").then((xlsx) => {
      // Process the data (same logic for filtering/transforming data)
      const processedData = data?.appointments.map((row) => {
        const processedRow = {};

        // Iterate over columns and process each one
        columns.forEach((col) => {
          const dataIndex = Array.isArray(col.dataIndex)
            ? col.dataIndex
            : [col.dataIndex];

          // Extract the value from the nested object/array
          const value = dataIndex.reduce((acc, key) => {
            return acc && acc[key] !== undefined ? acc[key] : ""; // Safe data access
          }, row);

          // Assign processed value to the corresponding column title
          processedRow[col.title] = value !== undefined ? value : "";
        });

        return processedRow; // Return processed row
      });

      // Convert processed data into a worksheet
      const worksheet = xlsx.utils.json_to_sheet(processedData);

      // Create a new workbook
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

      // Export as Excel file
      xlsx.writeFile(workbook, "staff_data.xlsx");
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return momentLocal(a.date, "YYYY-MM-DD").diff(
          momentLocal(b.date, "YYYY-MM-DD"),
        );
      },
      render: (text) => momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
      width: 80,
    },
    {
      title: "Appointment Type",
      dataIndex: "appointmentType",
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.appointmentType),
      isSearchRequired: true,
      width: 100,
    },
    {
      title: "Staff Name",
      dataIndex: "doctorName",
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.doctorName),
      isSearchRequired: true,
      width: 100,
    },
    {
      title: "No. of Appointments",
      dataIndex: "numberOfAppointments",
      sorter: (a, b) => a?.numberOfAppointments - b?.numberOfAppointments,
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.numberOfAppointments),
      isSearchRequired: true,
      width: 80,
    },
    {
      title: "Tip",
      dataIndex: "totalTipBilled",
      width: 80,
      hidden: !(context.defaultBranch.branchTypeId === 2),
      render: (text) => <Text> {PriceUtil.dollarValue(text, 2, true)}</Text>,
    },
    {
      title: "Total Amount Billed",
      dataIndex: "totalAmountBilled",
      sorter: (a, b) => a?.totalAmountBilled - b?.totalAmountBilled,
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.totalAmountBilled),
      isSearchRequired: true,
      width: 80,
      render: (text) => `$${text}`,
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
          <Col sm={24} xl={12} xxl={6}>
            <NumberCard
              onFilterChange={(value) =>
                handleFilterChange("numberCard1", value)
              }
              selectedFilter={props.selectedFilter}
              icon={ClientCardIcon1}
              title={"Appointments"}
              stats={apptCount.totalValues}
              count={`+${apptCount.totalAppointments}`}
              subtext={`in this ${props.selectedFilter.replace(/ly$/, "")}`}
              cardClass={"cardOne"}
            />
          </Col>
          <Col sm={24} xl={12} xxl={6}>
            <Bar2Card
              onFilterChange={(value) => handleFilterChange("barCard1", value)}
              data={dataAppt}
              barkey1={"appt_type_name"}
              barkey2={"count"}
              selectedFilter={props.selectedFilter}
              icon={ServiceIcon}
              title={"Types of Appointments"}
              count={"-12"}
              subtext={"in this month"}
              cardClass={"cardOne"}
            />
          </Col>
          <Col sm={24} xl={12} xxl={12}>
            <BarCard
              onFilterChange={(value) => handleFilterChange("barCard2", value)}
              data={datastaff}
              barkey1={"doctorName"}
              barkey2={"totalRevenue"}
              selectedFilter={props.selectedFilter}
              icon={RevenueIcon}
              title={"Total Revenue by Staff"}
              count={"-12"}
              subtext={"in this month"}
              cardClass={"cardOne"}
            />
          </Col>
        </Row>
      </div>
      <Row style={{ padding: 20 }}>
        <Col lg={24} md={24} sm={24}>
          <Card className="pageCardContainer" bordered={false}>
            <CardHeader
              className="ant-back-top-icon ant-anchor-link"
              onFilterChange={(value) => handleFilterChange("tableData", value)}
              selectedFilter={props.selectedFilter}
              title={"Staff"}
            />
            <AdvancedTable
              rowkey="clientId"
              dataSource={data?.appointments}
              columns={columns}
              rowClassName="editable-row"
              scroll={{ x: 1500, y: "calc(100vh - 360px)" }}
              className="clientListTable"
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
});

export default StaffView;
