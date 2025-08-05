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
  CashIcon,
  CheckIcon,
  ClientActive,
  ClientCardIcon1,
  ClientInactive,
  CreditIcon,
  DownloadIcon,
  GrandTotal,
  StatusIcon,
  TrashIcon,
  VaccineIcon,
} from "../../../util/SvgUtil";
import { NumberCard } from "../CommonComponent/NumberCard";
import { BarCard } from "../CommonComponent/BarCard";
import { DoubleLineCard } from "../CommonComponent/DoubleLineCard";
import ClientServices from "../../../../services/ClientServices";
import BillingServices from "../../../../services/BillingServices";
import BillingUtil from "../../../estimate/BillingUtil";
import PriceUtil from "../../../util/PriceUtil";
import { localToUtc, momentLocal } from "../../../util/TimeUtil";

const { Content } = Layout;
const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const currentDate = momentLocal;

const customStringFilter = (searchValue, currentValue) =>
  currentValue
    ? currentValue.toString().toLowerCase().includes(searchValue.toLowerCase())
    : "";

const TransactionView = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const commonContext = useContext(CommonContext);
  const [invoiceAction, setInvoiceAction] = useState({
    type: null,
    requiredData: {},
  });
  const [showRows, setShowRows] = useState([]);
  const [cashCount, setCashCount] = useState({});
  const [cardCount, setCardCount] = useState({});
  const [checkCount, setCheckCount] = useState({});
  const [totalCount, setTotalCount] = useState({});
  const [cardFilters, setCardFilters] = useState({
    numberCard1: props.cardFilters,
    numberCard2: props.cardFilters,
    numberCard3: props.cardFilters,
    numberCard4: props.cardFilters,
    numberCard5: props.cardFilters,
  });
  const [dates, setDates] = useState({
    startDate: props.startDate ? props.startDate : currentDate(),
    endDate: props.endDate ? props.endDate : currentDate(),
  });

  const getBillingData = (url) => {
    setShowRows([]);
    //BillingServices.getAllBillingInfo(url,(data)=>setData(data.reduce((total,current)=>{total[current.id]=current;return total;},{})));
  };

  useImperativeHandle(ref, () => ({
    export: exportToCSV,
    exportExcel: exportToExcel,
  }));

  useEffect(() => {
    setCardFilters({
      numberCard1: props.cardFilters,
      numberCard2: props.cardFilters,
      numberCard3: props.cardFilters,
      numberCard4: props.cardFilters,
      numberCard5: props.cardFilters,
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
          ReportServices.cashReport(
            filter,
            cardFilters.numberCard1,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted) {
                setCashCount(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.cashReport(
            filter,
            new Date().getFullYear(),
            cardFilters.numberCard1,
            0,
            null,
            null,
            (data) => {
              if (isMounted) {
                setCashCount(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.cashReport(
            filter,
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard1,
            null,
            null,
            (data) => {
              if (isMounted) {
                setCashCount(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.cashReport(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted) {
                setCashCount(data);
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
    cardFilters.numberCard1,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (
      cardFilters.numberCard5 !== null &&
      cardFilters.numberCard5 !== undefined
    ) {
      let isMounted = true; // Track if the component is still mounted

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.billingGlobal(
            filter,
            cardFilters.numberCard1,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted) {
                setData(
                  data.reduce((total, current) => {
                    total[current.id] = current;
                    return total;
                  }, {}),
                );
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.billingGlobal(
            filter,
            new Date().getFullYear(),
            cardFilters.numberCard1,
            0,
            null,
            null,
            (data) => {
              if (isMounted) {
                setData(
                  data.reduce((total, current) => {
                    total[current.id] = current;
                    return total;
                  }, {}),
                );
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.billingGlobal(
            filter,
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard1,
            null,
            null,
            (data) => {
              if (isMounted) {
                setData(
                  data.reduce((total, current) => {
                    total[current.id] = current;
                    return total;
                  }, {}),
                );
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.billingGlobal(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted) {
                setData(
                  data.reduce((total, current) => {
                    total[current.id] = current;
                    return total;
                  }, {}),
                );
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
    cardFilters.numberCard1,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (
      cardFilters.numberCard2 !== null &&
      cardFilters.numberCard2 !== undefined
    ) {
      let isMounted2 = true; // Track if the component is still mounted

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.checkReport(
            filter,
            cardFilters.numberCard2,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setCheckCount(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.checkReport(
            filter,
            new Date().getFullYear(),
            cardFilters.numberCard2,
            0,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setCheckCount(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.checkReport(
            filter,
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard2,
            null,
            null,
            (data) => {
              if (isMounted2) {
                setCheckCount(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.checkReport(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted2) {
                setCheckCount(data);
              }
            },
          );
        }
      };

      fetchData();

      // Cleanup function to prevent state updates if the component unmounts
      return () => {
        isMounted2 = false;
      };
    }
  }, [
    props.selectedFilter,
    cardFilters.numberCard2,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (
      cardFilters.numberCard3 !== null &&
      cardFilters.numberCard3 !== undefined
    ) {
      let isMounted3 = true; // Track if the component is still mounted

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.cardReport(
            filter,
            cardFilters.numberCard3,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted3) {
                setCardCount(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.cardReport(
            filter,
            new Date().getFullYear(),
            cardFilters.numberCard3,
            0,
            null,
            null,
            (data) => {
              if (isMounted3) {
                setCardCount(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.cardReport(
            filter,
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard3,
            null,
            null,
            (data) => {
              if (isMounted3) {
                setCardCount(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.cardReport(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted3) {
                setCardCount(data);
              }
            },
          );
        }
      };

      fetchData();

      // Cleanup function to prevent state updates if the component unmounts
      return () => {
        isMounted3 = false;
      };
    }
  }, [
    props.selectedFilter,
    cardFilters.numberCard3,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    if (
      cardFilters.numberCard4 !== null &&
      cardFilters.numberCard4 !== undefined
    ) {
      let isMounted4 = true; // Track if the component is still mounted

      const fetchData = () => {
        const filter = props.selectedFilter.toLowerCase();
        if (filter === "yearly") {
          ReportServices.totalAmtReport(
            filter,
            cardFilters.numberCard4,
            0,
            0,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setTotalCount(data);
              }
            },
          );
        } else if (filter === "monthly") {
          ReportServices.totalAmtReport(
            filter,
            new Date().getFullYear(),
            cardFilters.numberCard4,
            0,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setTotalCount(data);
              }
            },
          );
        } else if (filter === "weekly") {
          ReportServices.totalAmtReport(
            filter,
            new Date().getFullYear(),
            new Date().getMonth(),
            cardFilters.numberCard4,
            null,
            null,
            (data) => {
              if (isMounted4) {
                setTotalCount(data);
              }
            },
          );
        } else if (filter === "custom") {
          ReportServices.totalAmtReport(
            props.selectedFilter.toLowerCase(),
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            localToUtc(dates.startDate).format("YYYY-MM-DD"),
            localToUtc(dates.endDate).format("YYYY-MM-DD"),
            (data) => {
              if (isMounted4) {
                setTotalCount(data);
              }
            },
          );
        }
      };

      fetchData();

      // Cleanup function to prevent state updates if the component unmounts
      return () => {
        isMounted4 = false;
      };
    }
  }, [
    props.selectedFilter,
    cardFilters.numberCard4,
    dates.startDate,
    dates.endDate,
  ]);

  useEffect(() => {
    console.log("grooming", commonContext.defaultBranch.branchTypeId === 2);
    // PatientServices.fetchAllPatients((data) => setRequiredInputData(k=>({...k,patientDetails:data})));
    getBillingData();
  }, []);

  const exportToCSV = () => {
    // Extract headers based on column titles
    const headers = columns(setInvoiceAction, props.onSearch, commonContext)
      .filter((k) => {
        console.log(k.title + ": " + k.hidden);
        return !k.hidden;
      })
      .map((col) => col.title)
      .join(",");

    const rows = Object.values(data)
      .sort((a, b) => {
        return a.date && b.date
          ? momentLocal(b.date, "YYYY-MM-DD").diff(
              momentLocal(a.date, "YYYY-MM-DD"),
            )
          : 0;
      })
      .map((row) =>
        columns(setInvoiceAction, props.onSearch, commonContext)
          .filter((k) => {
            console.log(k.title + ": " + k.hidden);
            return !k.hidden;
          })
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
    link.setAttribute("download", "transaction_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    console.log("inside exportToExcel");

    import("xlsx").then((xlsx) => {
      // Extract headers based on column titles (filtering hidden columns)
      const headers = columns(setInvoiceAction, props.onSearch, commonContext)
        .filter((k) => !k.hidden)
        .map((col) => col.title);

      // Process the data (sort by date and map over the rows)
      const rows = Object.values(data)
        .sort((a, b) => {
          return a.date && b.date
            ? momentLocal(b.date, "YYYY-MM-DD").diff(
                momentLocal(a.date, "YYYY-MM-DD"),
              )
            : 0;
        })
        .map((row) => {
          const processedRow = {};

          // Process each column
          columns(setInvoiceAction, props.onSearch, commonContext)
            .filter((k) => !k.hidden)
            .forEach((col) => {
              const dataIndex = Array.isArray(col.dataIndex)
                ? col.dataIndex
                : [col.dataIndex];

              const value = dataIndex.reduce((acc, key) => {
                return acc && acc[key] !== undefined ? acc[key] : ""; // Safe data access
              }, row);

              processedRow[col.title] = value !== undefined ? value : ""; // Store the value in the corresponding column title
            });

          return processedRow; // Return the processed row for this entry
        });

      // Convert processed data into a worksheet
      const worksheet = xlsx.utils.json_to_sheet(rows, { header: headers });

      // Create a new workbook
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Transaction Data");

      // Export the data as an Excel file
      xlsx.writeFile(workbook, "transaction_data.xlsx");
    });
  };

  const refreshItems = (id) => {
    BillingServices.getBillingItemsById(id, (data) => {
      setData((k) => ({ ...k, [id]: { ...k[id], items: data } }));
    });
  };

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

  const dateFormat = "MM/DD/YYYY";

  const columns = (setInvoiceAction, onSearch, currentContext) => [
    {
      title: "Date",
      dataIndex: "date",

      sorter: (a, b) => {
        return momentLocal(a.date, "YYYY-MM-DD").diff(
          momentLocal(b.date, "YYYY-MM-DD"),
        );
      },
      render: (text) => momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
      width: 150,
    },

    {
      title: "Invoice ID",
      dataIndex: "id",
      isSearchRequired: true,
      width: 150,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      isSearchRequired: true,
      width: 210,
      render: (text, record) => (
        <Link
          onClick={() =>
            onSearch("Clients", { type: "C", id: record.clientId })
          }
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Stylist",
      dataIndex: "doctorName",
      isSearchRequired: true,
      width: 175,
    },
    {
      title: "Provider",
      dataIndex: "providerName",
      isSearchRequired: true,
      width: 175,
    },
    {
      title: "Total",
      dataIndex: "total",

      width: 175,

      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      title: "Remain",
      dataIndex: "balance",

      width: 175,

      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      // title: () => <Text style={{color: 'red'}}> Tip</Text>,
      title: "Tip",
      dataIndex: "tip",

      width: 175,
      hidden: !(commonContext.defaultBranch.branchTypeId === 2),

      render: (text) => <Text> {PriceUtil.dollarValue(text, 2, true)}</Text>,
    },
    // {
    //   title: 'Service Date',
    //   dataIndex: 'date',
    //   sorter: true

    // },
    {
      title: "Status",
      dataIndex: "status",
      width: 175,
      render: (text, record) => (
        <Tag
          style={{
            borderRadius: "4px",
            width: "8em",
            textAlign: "center",
            backgroundColor:
              CommonUtil.STATUS_OBJECT_BG_COLOR[text?.toUpperCase()],
            border:
              " 1px solid " +
              CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
          }}
          color={CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()]}
        >
          <Text
            style={{
              color: CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
            }}
          >
            {text ?? "Unknown"}
          </Text>
        </Tag>
      ),
      filters: [
        {
          text: "Paid",
          value: "Paid",
        },
        {
          text: "Unpaid",
          value: "Unpaid",
        },
        {
          text: "Partial",
          value: "Partial",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },

    {
      title: "Method",
      dataIndex: "customPaymentMethod",
      width: 175,
      render: (text) => <Text> {BillingUtil.paymentMethodValue(text)}</Text>,
      filters: [
        {
          text: "Credit",
          value: "Credit",
        },
        {
          text: "Credit NPS",
          value: "Write-In",
        },
        {
          text: "Multiple",
          value: ",",
        },
        {
          text: "Cash",
          value: "Cash",
        },
        {
          text: "Other",
          value: "Other",
        },
      ],
      onFilter: (value, record) => record.customPaymentMethod.includes(value),
    },
  ];

  const secondaryColumns = [
    {
      title: "Service Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Provider",
      dataIndex: "providerId",
      render: (text, record) =>
        record.providerFirstName + " " + record.providerLastName,
      sorter: true,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
      sorter: true,
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
              icon={CashIcon}
              title={"Total Cash Amount"}
              stats={`$${cashCount.TotalCash}`}
              count={`${cashCount.percentageChange}%`}
              subtext={`compared to last ${props.selectedFilter.replace(/ly$/, "")}`}
              cardClass={"cardThree"}
            />
          </Col>
          <Col sm={24} xl={12} xxl={6}>
            <NumberCard
              onFilterChange={(value) =>
                handleFilterChange("numberCard2", value)
              }
              selectedFilter={props.selectedFilter}
              icon={CheckIcon}
              title={"Total Check Amount"}
              stats={`$${checkCount.TotalCash}`}
              count={`${checkCount.percentageChange}%`}
              subtext={`compared to last ${props.selectedFilter.replace(/ly$/, "")}`}
              cardClass={"cardTwo"}
            />
          </Col>
          <Col sm={24} xl={12} xxl={6}>
            <NumberCard
              onFilterChange={(value) =>
                handleFilterChange("numberCard3", value)
              }
              selectedFilter={props.selectedFilter}
              icon={CreditIcon}
              title={"Total Credit Card Amount"}
              stats={`$${cardCount.TotalCash}`}
              count={`${cardCount.percentageChange}%`}
              subtext={`compared to last ${props.selectedFilter.replace(/ly$/, "")}`}
              cardClass={"cardOne"}
            />
          </Col>
          <Col sm={24} xl={12} xxl={6}>
            <NumberCard
              onFilterChange={(value) =>
                handleFilterChange("numberCard4", value)
              }
              selectedFilter={props.selectedFilter}
              icon={GrandTotal}
              title={"Grand Total Amount"}
              stats={`$${totalCount.TotalCash}`}
              count={`${totalCount.percentageChange}%`}
              subtext={`compared to last ${props.selectedFilter.replace(/ly$/, "")}`}
              cardClass={"cardFour"}
            />
          </Col>
        </Row>
      </div>
      <Row style={{ padding: 20 }}>
        <Col lg={24} md={24} sm={24}>
          <Card
            className="lab-list-card pageCardContainer"
            title="Billing Overview"
            bordered={false}
            //  extra = { <><RangePicker format={dateFormat}
            //     onChange={(value) => {
            //       if (!value) {
            //         getBillingData();
            //       } else {
            //         const startDate = localToUtc(value[0]).format("YYYY-MM-DD");
            //         const endDate = localToUtc(value[1]).format("YYYY-MM-DD");
            //         getBillingData(`?stDate=${startDate}&endDate=${endDate}`);
            //       }
            //     }}
            //     /></>}
          >
            <AdvancedTable
              dataSource={Object.values(data).sort((a, b) => {
                return a.date && b.date
                  ? momentLocal(b.date, "YYYY-MM-DD").diff(
                      momentLocal(a.date, "YYYY-MM-DD"),
                    )
                  : 0;
              })}
              rowKey="id"
              expandable={{
                expandedRowRender: (record) => (
                  <AdvancedTable
                    rowKey="id"
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
              columns={columns(
                setInvoiceAction,
                props.onSearch,
                commonContext,
              ).filter((k) => {
                console.log(k.title + ": " + k.hidden);
                return !k.hidden;
              })}
              scroll={{ x: 1500, y: "calc(100vh - 370px)" }}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
});

export default TransactionView;
