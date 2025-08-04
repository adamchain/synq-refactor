import { Col, Row, Select, Tag, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import CommonUtil from "../util/CommonUtil";
import { LabActions, LabActionTypes } from "./LabActions";

const { Link, Title, Text } = Typography;
const { Option } = Select;

//Labtype 1 is Zoetis , 2 is Zoetis Ref lab , 3 is Idexx , 4 is Antech

const NoLabsAdded = () => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={24}>
          {" "}
          <Title style={{ color: "unset" }} level={4}>
            No Labs Added
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24}>Add a lab from here or billing to begin</Col>
      </Row>
    </>
  );
};

const NewLabsTable = (props) => {
  const [modalOpen, setModalOpen] = useState({ type: null, data: {} });
  const [deviceList, setDeviceList] = useState([]);
  const context = useContext(CommonContext);

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

  const columns = [
    {
      title: "Name",
      dataIndex: "code",
      className: "external-lab-column",
      isSearchRequired: true,
      render: (text, record) => record.name,
    },
    {
      title: "Provider",
      width: 135,
      dataIndex: "provider",
      render: (text, record) =>
        (record.pFirstName ? record.pFirstName.charAt(0) : "") +
        " " +
        record.pLastName,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "middle",
      sorter: true,
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
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "110px",
      render: (text, record) => {
        let tempProps = {
          modalOpen,
          setModalOpen,
          deviceList,
          setDeviceList,
          refreshTableData: props.refreshTableData,
          text,
          record,
        };
        return <LabActionTypes {...tempProps} />;
      },
    },
  ];
  let tempProps = {
    modalOpen,
    setModalOpen,
    deviceList,
    setDeviceList,
    refreshTableData: props.refreshTableData,
  };

  return (
    <>
      <AdvancedTable
        size="middle"
        id="new-labs-table"
        rowClassName={(record, index) =>
          record.labType === 4 ? "is-external-lab" : ""
        }
        columns={columns}
        dataSource={props.newLabsTableData}
        rowKey="id"
        locale={{ emptyText: <NoLabsAdded /> }}
      />
      <LabActions {...tempProps} />
    </>
  );
};

export default NewLabsTable;
