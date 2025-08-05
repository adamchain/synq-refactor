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
  TrashIcon,
  VaccineIcon,
} from "../../../util/SvgUtil";
import { NumberCard } from "../CommonComponent/NumberCard";
import { BarCard } from "../CommonComponent/BarCard";
import { DoubleLineCard } from "../CommonComponent/DoubleLineCard";
import ClientServices from "../../../../services/ClientServices";

const { Content } = Layout;
const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const currentDate = momentLocal;

const customStringFilter = (searchValue, currentValue) =>
  currentValue
    ? currentValue.toString().toLowerCase().includes(searchValue.toLowerCase())
    : "";

const ApptView = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const context = useContext(CommonContext);
  const [newClientCount, setNewClientCount] = useState({});
  const [clientActiveCount, setClientActiveCount] = useState({});
  const [clientInactive, setClientInactive] = useState({});
  const [vacData, setVacData] = useState({});
  const [cardFilters, setCardFilters] = useState({
    numberCard1: props.cardFilters,
    numberCard2: props.cardFilters,
    barCard: props.cardFilters,
    doubleLineCard: props.cardFilters,
  });
  const [dates, setDates] = useState({
    startDate: props.startDate ? props.startDate : currentDate(),
    endDate: props.endDate ? props.endDate : currentDate(),
  });

  useImperativeHandle(ref, () => ({
    export: exportToCSV,
    exportExcel: exportToExcel,
  }));

  let allStates = context.allStates;
  useEffect(() => {
    ClientServices.getAllClients(setData);
  }, []);

  useEffect(() => {
    setCardFilters({
      numberCard1: props.cardFilters,
      numberCard2: props.cardFilters,
      barCard: props.cardFilters,
      doubleLineCard: props.cardFilters,
    });
  }, [props.cardFilters]);

  useEffect(() => {
    if (
      cardFilters.numberCard1 !== null &&
      cardFilters.numberCard1 !== undefined
    ) {
      let isMounted = true; // Track if the component is still mounted

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.clientTotal(
            filter,
            cardFilters.numberCard1,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted) {
                setNewClientCount(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.clientTotal(
            filter,
            new Date().getFullYear(),
            cardFilters.numberCard1,
            0,
            null,
            null,
            (data) => {
              if (isMounted) {
                setNewClientCount(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.clientTotal(
            filter,
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard1,
            null,
            null,
            (data) => {
              if (isMounted) {
                setNewClientCount(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.clientTotal(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted) {
                setNewClientCount(data);
              }
            },
          );
        }
      };

      fetchData();

      // Cleanup function to prevent state updates if the component unmounts
      return () => {
        isMounted = false;
      };
    }
  }, [
    props.selectedFilter,
    props.cardFilters,
    cardFilters.numberCard1,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (
      cardFilters.numberCard2 !== null &&
      cardFilters.numberCard2 !== undefined
    ) {
      let isMounted2 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.clientActive(
            props.selectedFilter.toLowerCase(),
            cardFilters.numberCard2,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setClientActiveCount(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.clientActive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.numberCard2,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setClientActiveCount(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.clientActive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard2,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setClientActiveCount(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.clientActive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted2) {
                setClientActiveCount(data);
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
    props.cardFilters,
    cardFilters.numberCard2,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (cardFilters.barCard !== null && cardFilters.barCard !== undefined) {
      let isMounted3 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.clientInActive(
            props.selectedFilter.toLowerCase(),
            cardFilters.barCard,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted3) {
                setClientInactive(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.clientInActive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.barCard,
            0,
            null,
            null,
            (data) => {
              if (isMounted3) {
                setClientInactive(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.clientInActive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.barCard,
            null,
            null,
            (data) => {
              if (isMounted3) {
                setClientInactive(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.clientInActive(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted3) {
                setClientInactive(data);
              }
            },
          );
        }
      };
      fetchData();

      return () => {
        isMounted3 = false;
      };
    }
  }, [
    props.selectedFilter,
    props.cardFilters,
    cardFilters.barCard,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (
      cardFilters.doubleLineCard !== null &&
      cardFilters.doubleLineCard !== undefined
    ) {
      let isMounted2 = true;

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.vacPres(
            props.selectedFilter.toLowerCase(),
            cardFilters.doubleLineCard,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setVacData(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.vacPres(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            cardFilters.doubleLineCard,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setVacData(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.vacPres(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.doubleLineCard,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setVacData(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.vacPres(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted2) {
                setVacData(data);
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
    props.cardFilters,
    cardFilters.doubleLineCard,
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
    console.log("testt--", value);
  };

  const dataApi = [
    { category: "Euthenized", count: 20 },
    { category: "Moved", count: 40 },
    { category: "Other", count: 30 },
  ];

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
      width: 150,
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: ["primary", "firstName"],
      sorter: (a, b) =>
        a?.primary?.firstName?.localeCompare(b.primary.firstName),
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.firstName),
      isSearchRequired: true,
      width: 180,
    },
    {
      title: "Last Name",
      dataIndex: ["primary", "lastName"],
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a?.primary?.lastName?.localeCompare(b.primary.lastName),
      //sorter: true,
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.lastName),
      isSearchRequired: true,
      width: 180,
    },
    {
      title: "Email",
      dataIndex: ["primary", "email"],
      sorter: (a, b) => a.primary.email.localeCompare(b.primary.email),
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.email),
      isSearchRequired: true,
      width: 275,
    },
    {
      title: "Primary Phone",
      dataIndex: "phones",
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          record.phones?.find((k) => k.type === "PH")?.nbr ?? "",
        ),
      isSearchRequired: true,
      width: 165,
      render: (text) => text?.find((k) => k.type === "PH")?.nbr ?? "",
    },
    {
      title: "Mobile",
      dataIndex: "phones",
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          record.phones?.find((k) => k.type === "PM")?.nbr ?? "",
        ),
      isSearchRequired: true,
      width: 165,
      render: (text) => text?.find((k) => k.type === "PM")?.nbr ?? "",
    },

    {
      title: "Ok to Text",
      dataIndex: "allowText",
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
      ],
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.allowText ? "Yes" : "No"),
      render: (text) => (text ? "Yes" : "No"),
      isSearchRequired: false,
      width: 135,
    },
    {
      title: "Ok to Email",
      dataIndex: "allowEmail",
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
      ],
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.allowEmail ? "Yes" : "No"),
      render: (text) => (text ? "Yes" : "No"),
      isSearchRequired: false,
      width: 135,
    },
    {
      title: "City",
      dataIndex: ["primary", "city"],
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.city),
      isSearchRequired: true,
      width: 155,
    },
    {
      title: "State",
      dataIndex: ["primary", "stateId"],
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          allStates?.[record?.primary?.stateId]?.stateName ?? "",
        ),
      render: (text) => allStates?.[text]?.stateName ?? "",
      width: 100,
      isSearchRequired: true,
    },
    {
      title: "Status",
      dataIndex: "clientStatus",
      width: 150,
      filters: [
        {
          text: "Active",
          value: "A",
        },
        {
          text: "Inactive",
          value: "I",
        },
      ],
      isSearchRequired: false,
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          record?.clientStatus === "A" ? "A" : "I",
        ),
      render: (text) => (
        <Tag
          style={{ width: "90px", textAlign: "center" }}
          color={text === "A" ? "green" : "red"}
        >
          {text === "A" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  const exportToExcel = () => {
    import("xlsx").then((xlsx) => {
      // Process data for Excel
      const processedData = data.map((row) => {
        const processedRow = {};
        columns.forEach((col) => {
          const dataIndex = Array.isArray(col.dataIndex)
            ? col.dataIndex
            : [col.dataIndex];

          // Extract the value from the nested object/array
          const value = dataIndex.reduce((acc, key) => {
            if (key === "stateId") {
              return acc && acc[key] !== undefined
                ? allStates[acc[key]]?.stateName
                : "";
            }
            if (key === "createdTime") {
              return acc && momentLocal(acc[key]).format("YYYY-MM-DD");
            } else {
              return acc && acc[key] !== undefined ? acc[key] : ""; // Safe data access
            }
          }, row);

          // Special case for arrays (e.g., phones)
          if (Array.isArray(value)) {
            const phone = value.find((phone) => phone.type === "PH")?.nbr || "";
            const mobile =
              value.find((phone) => phone.type === "PM")?.nbr || "";
            processedRow[col.title] =
              col.title === "Primary Phone" ? phone : mobile;
          } else {
            processedRow[col.title] =
              value !== undefined && !Array.isArray(value) ? value : "";
          }
        });
        return processedRow;
      });

      // Convert processed data to worksheet and export
      const worksheet = xlsx.utils.json_to_sheet(processedData);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Data");
      xlsx.writeFile(workbook, "client_data.xlsx");
    });
  };

  const exportToCSV = (value) => {
    console.log("values===", value);
    // Extract headers based on column titles
    const headers = columns
      .map((col) => col.title) // Extract column titles for the header row
      .join(",");

    // Extract data rows and handle nested fields correctly
    const rows = data
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
                if (key == "stateId") {
                  return acc && acc[key] !== undefined
                    ? allStates[acc[key]]?.stateName
                    : "";
                }
                if (key === "createdTime") {
                  return acc && momentLocal(acc[key]).format("YYYY-MM-DD");
                } else {
                  return acc && acc[key] !== undefined ? acc[key] : ""; // Safe data access
                }
              }, row);

              // Special case for arrays (e.g., phones)
              if (Array.isArray(value)) {
                const phone =
                  value.find((phone) => phone.type === "PH")?.nbr || "";
                const mobile =
                  value.find((phone) => phone.type === "PM")?.nbr || "";
                return col.title == "Primary Phone"
                  ? `"${phone}"`
                  : `"${mobile}"`;
              }

              // Return value as string, safely
              return value !== undefined && !Array.isArray(value)
                ? `"${value}"`
                : "";
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
    link.setAttribute("download", "client_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <Col sm={24} xl={12} xxl={8}>
            <NumberCard
              onFilterChange={(value) =>
                handleFilterChange("numberCard1", value)
              }
              selectedFilter={props.selectedFilter}
              icon={ClientCardIcon1}
              title={"New Clients"}
              stats={newClientCount.total_count}
              count={`+${newClientCount.count}`}
              subtext={`in this ${props.selectedFilter.replace(/ly$/, "")}`}
              cardClass={"cardOne"}
            />
          </Col>
          {/* <Col sm={24} xl={12} xxl={8}>      
                    <NumberCard onFilterChange={(value) => handleFilterChange('numberCard2', value)} selectedFilter ={props.selectedFilter } icon={ClientActive} title={'Active'} stats={clientActiveCount.total_count} count={`+${clientActiveCount.count}`} subtext={`in this ${(props.selectedFilter).replace(/ly$/, "")}`} cardClass={'cardTwo'}/>
                </Col>
                <Col sm={24} xl={12} xxl={8}>    
                    <BarCard onFilterChange={(value) => handleFilterChange('barCard', value)} barkey1={'patient_status_name'} data={clientInactive.status_counts} selectedFilter ={props.selectedFilter } icon={ClientInactive} title={'Inactive'} stats={clientInactive.count} count={""} subtext={'in this month'} cardClass={'cardOne'}/>
                </Col> */}
        </Row>
      </div>
      <Row style={{ padding: 20 }}>
        <Col lg={24} md={24} sm={24}>
          <Card className="pageCardContainer" title="Clients" bordered={false}>
            <AdvancedTable
              rowkey="clientId"
              dataSource={data}
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

export default ApptView;
