import React, { useContext, useEffect, useState } from "react";
import WhskrPageHeader from "../page-header/WhskrPageHeader";

import { Card, DatePicker, Layout, Tag, Typography } from "antd";

import { CommonContext } from "../../context/CommonContext";
import LabServices from "../../services/LabServices";
import CommonUtil from "../util/CommonUtil";
import { localToUtc, momentLocal, utcToLocal } from "../util/TimeUtil";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import AssignLabModal from "./AssignLabModal";
import { LabActions, LabActionTypes } from "./LabActions";
import "./Labs.scss";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;

const dateFormat = "MM/DD/YYYY";
//TODO Hardcoded values need to change line ids no 42 and 49

const LabsPage = (props) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState({ type: null, data: {} });
  const [deviceList, setDeviceList] = useState([]);
  const [assignLabModal, setAssignLabModal] = useState({
    isOpen: false,
    data: {},
  });
  const context = useContext(CommonContext);
  const [dateRange, setDateRange] = useState([
    momentLocal().subtract(90, "days"),
    momentLocal(),
  ]);

  const devices = {
    ivlsDeviceList: [
      {
        deviceSerialNumber: "PTH4451966",
        displayName: "IVLS",
        lastPolledCloudTime: "2022-02-05T05:44:51+0000",
        vcpActivatedStatus: "ACTIVE",
      },
      {
        deviceSerialNumber: "PTH2155893",
        displayName: "IVLS",
        lastPolledCloudTime: "2022-02-05T05:44:51+0000",
        vcpActivatedStatus: "ACTIVE",
      },
    ],
  };

  useEffect(() => {
    setDeviceList(devices.ivlsDeviceList);
  }, []);

  const getallLabData = () => {
    let url =
      "?stDate=" +
      localToUtc(dateRange[0]).format("YYYY-MM-DD") +
      "&endDate=" +
      localToUtc(dateRange[1]).format("YYYY-MM-DD");
    LabServices.getAllLabOrdersForBranch(url, setData);
  };

  useEffect(() => {
    refreshTableData();
  }, [dateRange]);

  const refreshTableData = () => {
    getallLabData();
  };
  const columns = (refreshTableData, onSearch) => [
    {
      title: "Invoice ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: 120,
    },
    {
      title: "Lab Name",
      dataIndex: "name",
      isSearchRequired: true,
      width: 370,
    },
    {
      title: "Patient",
      dataIndex: "patient",
      isSearchRequired: true,
      width: 170,
      render: (text, record) => {
        return text ? (
          <Link
            onClick={() =>
              onSearch("Clients", {
                type: "P",
                id: record.patientId,
                clId: record.clientId,
              })
            }
          >
            {" "}
            {text}
          </Link>
        ) : (
          <Link
            onClick={() => {
              setAssignLabModal({ isOpen: true, data: { id: record.id } });
            }}
            style={{ color: "red" }}
          >
            Assign Patient
          </Link>
        );
      },
    },
    {
      title: "Client",
      dataIndex: "client",
      isSearchRequired: true,
      width: 185,
      render: (text, record) => (
        <Link
          onClick={() =>
            onSearch("Clients", { type: "C", id: record.clientId })
          }
        >
          {" "}
          {text}
        </Link>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctor",

      sorter: (a, b) => a.doctor?.localeCompare(b.doctor),
      // onFilter: (searchValue, record) => customStringFilter(searchValue,record?.primary?.firstName),
      width: 175,
    },
    {
      title: "Administered",
      dataIndex: "date",
      sorter: true,
      width: 190,
      defaultSortOrder: "descend",
      render: (text) =>
        utcToLocal(text, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY h:mm a"),
      sorter: (a, b) =>
        utcToLocal(a.date, "YYYY-MM-DDTHH:mm:ss").diff(
          utcToLocal(b.date, "YYYY-MM-DDTHH:mm:ss"),
        ),
    },
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
            {text}
          </Text>
        </Tag>
      ),
      filters: [
        {
          text: "COMPLETED",
          value: "Completed",
        },
        {
          text: "NOT STARTED",
          value: "Not Started",
        },
        {
          text: "ERROR",
          value: "Error",
        },
        {
          text: "READY",
          value: "Ready",
        },
        {
          text: "UPDATED",
          value: "Updated",
        },
        {
          text: "PARTIAL",
          value: "Partial",
        },
        //   {
        //     text: 'Package',
        //     value: 5,
        //   },
      ],
      onFilter: (value, record) => record.status === value,
    },

    {
      title: "Actions",
      dataIndex: "operation",
      fixed: "right",
      width: 150,
      render: (text, record) => {
        let tempProps = {
          modalOpen,
          setModalOpen,
          deviceList,
          setDeviceList,
          refreshTableData: refreshTableData,
          text,
          record,
        };
        return <LabActionTypes {...tempProps} />;
      },
    },
  ];

  useEffect(() => {
    refreshTableData();
  }, []);
  let tempProps = {
    modalOpen,
    setModalOpen,
    deviceList,
    setDeviceList,
    refreshTableData: refreshTableData,
  };

  return (
    <>
      <Layout id="lab-page">
        <WhskrPageHeader title="Labs" buttonName="Create New" />
        <Content className="masterContentPadding">
          <Card
            className="lab-list-card pageCardContainer"
            title={`Lab Records (${data?.length})`}
            bordered={false}
            extra={
              <RangePicker
                format={dateFormat}
                value={dateRange}
                onChange={(k) => {
                  if (k) {
                    setDateRange(k);
                    // k && getallLabData("?stDate="+localToUtc(k[0]).format("YYYY-MM-DD")+"&endDate="+localToUtc(k[1]).format("YYYY-MM-DD"))
                  }
                }}
              />
            }
          >
            <AdvancedTable
              dataSource={data}
              className="labsPageTable"
              columns={columns(refreshTableData, props.onSearch)}
              scroll={{ x: 1500, y: 700 }}
            />
          </Card>
        </Content>
      </Layout>
      <LabActions {...tempProps} />
      {assignLabModal.isOpen && (
        <AssignLabModal
          data={assignLabModal.data}
          onClose={() => setAssignLabModal({ isOpen: false, data: {} })}
          onRefresh={refreshTableData}
        />
      )}
    </>
  );
};

export default LabsPage;
