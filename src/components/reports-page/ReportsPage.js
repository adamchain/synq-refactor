import React, { useState, useEffect, useContext, useRef } from "react";
import WhskrPageHeader from "../page-header/WhskrPageHeader";
import "./ReportsPage.scss";
import {
  Card,
  Statistic,
  DatePicker,
  Typography,
  Layout,
  Select,
  Button,
  Radio,
  Space,
  Row,
  Tooltip,
  Col,
  Tag,
  Divider,
  Modal,
  Popconfirm,
  Dropdown,
  Menu,
} from "antd";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import { CommonContext } from "../../context/CommonContext";
import ReportsDrawer from "./ReportsDrawer";
import ReportServices from "../../services/ReportServices";
import { localToUtc, momentLocal } from "../util/TimeUtil";
import CommonUtil from "../util/CommonUtil";
import {
  ArrowLeftOutlined,
  CloudDownloadOutlined,
  SwapOutlined,
  DownloadOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { TotalRevenue } from "./ReportsComponent/TotalRevenue";
import { StaffReport } from "./ReportsComponent/StaffReport";
import { InventoryReport } from "./ReportsComponent/InventoryReport";
import { ApptReport } from "./ReportsComponent/ApptReport";
import { TransactionReport } from "./ReportsComponent/TransactionReport";
import ApptView from "./ReportsComponent/DetailView/ApptView";
import TransactionView from "./ReportsComponent/DetailView/TransactionView";
import { ServiceReport } from "./ReportsComponent/ServiceReport";
import StaffView from "./ReportsComponent/DetailView/StaffView";
import ServiceView from "./ReportsComponent/DetailView/ServiceView";
import InventoryView from "./ReportsComponent/DetailView/InventoryView";
import { ExportButton } from "./ReportsComponent/CommonComponent/ExportBtn";
import { GlobalFilter } from "./ReportsComponent/CommonComponent/GlobalFilter";

const { Content } = Layout;
const { Text, Link } = Typography;
const { Group: RadioGroup } = Radio;
const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";
const currentDate = momentLocal;

const FilterBtn = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <>
      <Dropdown
        overlay={
          // <Menu className='mainSettings' onClick={(info)=>{setSelectedFilter(info.key)}}>
          <Menu className="mainSettings">
            <Menu.Item>
              <Radio.Group
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <Space direction="vertical">
                  {/* <Radio value="Daily">Daily</Radio> */}
                  <Radio value="Weekly">Weekly</Radio>
                  <Radio value="Monthly">Monthly</Radio>
                  <Radio value="Yearly">Yearly</Radio>
                  <Radio value="Custom">Custom</Radio>
                </Space>
              </Radio.Group>
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Button
          className="createNewBTN ant-breadcrumb-separator"
          size="large"
          shape="round"
          icon={<CalendarOutlined />}
          onClick={(e) => e.preventDefault()}
        >
          {selectedFilter}
        </Button>
      </Dropdown>
    </>
  );
};

const ReportsPage = (props) => {
  const [reports, setReports] = useState([]);
  const [openReportsDrawer, setOpenReportsDrawer] = useState(null);
  const [viewCard, setViewCard] = useState("all");
  const commonContext = useContext(CommonContext);
  const [selectedFilter, setSelectedFilter] = useState("Monthly");
  const [cardFilters, setCardFilters] = useState();

  const exportRef = useRef();
  const [dates, setDates] = useState({
    startDate: currentDate(),
    endDate: currentDate(),
  });

  const handleExport = (format) => {
    if (exportRef.current) {
      if (format === "csv") {
        exportRef.current.export();
      } else if (format === "excel") {
        exportRef.current.exportExcel();
      }
    }
  };

  const handleDateChange = (value) => {
    setDates({
      startDate: value ? value[0] : currentDate(),
      endDate: value ? value[1] : currentDate(),
    });
  };
  const handleFilterChange = (value) => {
    setCardFilters(value);
  };

  return (
    <Layout id="reports-page">
      {viewCard == "all" && (
        <>
          <WhskrPageHeader
            title="Report Overview"
            extra={[
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // Stack buttons and filter vertically
                  alignItems: "center", // Align to the left
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  {/* Align FilterBtn and ExportButton side by side */}
                  <FilterBtn
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                  />
                </div>
                <GlobalFilter
                  cardFilters={cardFilters}
                  onFilterChange={(value) => handleFilterChange(value)}
                  selectedFilter={selectedFilter}
                />
              </div>,
            ]}
          />
          <Content className="masterContentPadding scollerMaster">
            {selectedFilter == "Custom" && (
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
                <TotalRevenue
                  cardFilters={cardFilters}
                  dates={dates}
                  selectedFilter={selectedFilter}
                />
                <StaffReport
                  cardFilters={cardFilters}
                  dates={dates}
                  selectedFilter={selectedFilter}
                  onClick={() => {
                    setViewCard("staff");
                  }}
                />
                <InventoryReport
                  cardFilters={cardFilters}
                  dates={dates}
                  selectedFilter={selectedFilter}
                  onClick={() => {
                    setViewCard("inventory");
                  }}
                />
                <ServiceReport
                  cardFilters={cardFilters}
                  dates={dates}
                  selectedFilter={selectedFilter}
                  onClick={() => {
                    setViewCard("services");
                  }}
                />
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <ApptReport
                  cardFilters={cardFilters}
                  dates={dates}
                  selectedFilter={selectedFilter}
                  onClick={() => {
                    setViewCard("appointment");
                  }}
                />
                <TransactionReport
                  cardFilters={cardFilters}
                  dates={dates}
                  selectedFilter={selectedFilter}
                  onClick={() => {
                    setViewCard("transaction");
                  }}
                />
              </Row>
            </div>
          </Content>
        </>
      )}
      {viewCard == "appointment" && (
        <>
          <WhskrPageHeader
            title={
              <>
                <ArrowLeftOutlined onClick={() => setViewCard("all")} />
                &nbsp;&nbsp;<Text>Client</Text>
              </>
            }
            extra={[
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // Stack buttons and filter vertically
                  alignItems: "center", // Align to the left
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  {/* Align FilterBtn and ExportButton side by side */}
                  <FilterBtn
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                  />
                  <ExportButton handleExport={handleExport} />
                </div>
                <GlobalFilter
                  cardFilters={cardFilters}
                  onFilterChange={(value) => handleFilterChange(value)}
                  selectedFilter={selectedFilter}
                />
              </div>,
            ]}
          />
          <ApptView
            cardFilters={cardFilters}
            startDate={dates.startDate}
            endDate={dates.endDate}
            ref={exportRef}
            selectedFilter={selectedFilter}
          />
        </>
      )}
      {viewCard == "transaction" && (
        <>
          <WhskrPageHeader
            title={
              <>
                <ArrowLeftOutlined onClick={() => setViewCard("all")} />
                &nbsp;&nbsp;<Text>Billing/Transactions</Text>
              </>
            }
            extra={[
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // Stack buttons and filter vertically
                  alignItems: "center", // Align to the left
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  {/* Align FilterBtn and ExportButton side by side */}
                  <FilterBtn
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                  />
                  <ExportButton handleExport={handleExport} />
                </div>
                <GlobalFilter
                  cardFilters={cardFilters}
                  onFilterChange={(value) => handleFilterChange(value)}
                  selectedFilter={selectedFilter}
                />
              </div>,
            ]}
          />
          <TransactionView
            cardFilters={cardFilters}
            startDate={dates.startDate}
            endDate={dates.endDate}
            ref={exportRef}
            selectedFilter={selectedFilter}
          />
        </>
      )}
      {viewCard == "staff" && (
        <>
          <WhskrPageHeader
            title={
              <>
                <ArrowLeftOutlined onClick={() => setViewCard("all")} />
                &nbsp;&nbsp;<Text>Staff</Text>
              </>
            }
            extra={[
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // Stack buttons and filter vertically
                  alignItems: "center", // Align to the left
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  {/* Align FilterBtn and ExportButton side by side */}
                  <FilterBtn
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                  />
                  <ExportButton handleExport={handleExport} />
                </div>
                <GlobalFilter
                  cardFilters={cardFilters}
                  onFilterChange={(value) => handleFilterChange(value)}
                  selectedFilter={selectedFilter}
                />
              </div>,
            ]}
          />
          <StaffView
            cardFilters={cardFilters}
            startDate={dates.startDate}
            endDate={dates.endDate}
            ref={exportRef}
            selectedFilter={selectedFilter}
          />
        </>
      )}
      {viewCard == "inventory" && (
        <>
          <WhskrPageHeader
            title={
              <>
                <ArrowLeftOutlined onClick={() => setViewCard("all")} />
                &nbsp;&nbsp;<Text>Inventory</Text>
              </>
            }
            extra={[
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // Stack buttons and filter vertically
                  alignItems: "center", // Align to the left
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  {/* Align FilterBtn and ExportButton side by side */}
                  <FilterBtn
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                  />
                  <ExportButton handleExport={handleExport} />
                </div>
                <GlobalFilter
                  cardFilters={cardFilters}
                  onFilterChange={(value) => handleFilterChange(value)}
                  selectedFilter={selectedFilter}
                />
              </div>,
            ]}
          />
          <InventoryView
            cardFilters={cardFilters}
            startDate={dates.startDate}
            endDate={dates.endDate}
            ref={exportRef}
            selectedFilter={selectedFilter}
          />
        </>
      )}
      {viewCard == "services" && (
        <>
          <WhskrPageHeader
            title={
              <>
                <ArrowLeftOutlined
                  onClick={() => {
                    setViewCard("all");
                  }}
                />
                &nbsp;&nbsp;<Text>Services</Text>
              </>
            }
            extra={[
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                {/* <FilterBtn selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} /> */}
                <ExportButton handleExport={handleExport} />{" "}
              </div>,
            ]}
          />
          <ServiceView
            cardFilters={cardFilters}
            startDate={dates.startDate}
            endDate={dates.endDate}
            ref={exportRef}
            selectedFilter={selectedFilter}
          />
        </>
      )}

      {/* {openReportsDrawer && 
                <ReportsDrawer 
                onSuccess = {()=>{setOpenReportsDrawer(null);getAllReports();}}
                onClose = {()=>setOpenReportsDrawer(null)}/>} */}
    </Layout>
  );
};

export default ReportsPage;
