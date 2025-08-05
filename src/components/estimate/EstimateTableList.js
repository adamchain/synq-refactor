import React, { useState } from "react";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import { Tag, Typography, Tooltip, Row, Col, Menu, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { SendIcon, EditIcon } from "../util/SvgUtil";

import { ESTIMATE_STATUS } from "./EstimateHelper";
import SendEstimateDrawer from "./SendEstimateDrawer";
import { momentLocal } from "../util/TimeUtil";
import BillingUtil from "./BillingUtil";
import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";

const { Link } = Typography;

const EstimateTableList = (props) => {
  const [sendEstimateData, setSendEstimateData] = useState();
  const commonContext = useContext(CommonContext);

  const columns = [
    {
      title: "Date",
      width: 110,
      dataIndex: "date",
      render: (text) => momentLocal(text).format("MM/DD/YYYY"),
    },
    props.isClient
      ? {
          title: "Patient",
          width: 110,
          dataIndex: "patientId",
          render: (text) =>
            props.allPets.find((k) => k.patientId === text)?.patientName,
        }
      : { title: "ID", dataIndex: "id", width: 110 },
    { title: "Name", dataIndex: "name" },
    {
      title: "Status",
      width: 110,
      dataIndex: "status",
      render: (text, record) =>
        text ? (
          <Tag
            color={
              Object.values(ESTIMATE_STATUS).find(
                (k) => k.desc === text.toUpperCase().trim(),
              ).color
            }
          >
            {" "}
            {text.toUpperCase()}
          </Tag>
        ) : (
          ""
        ),
    },
    {
      title: "Total",
      align: "right",
      width: 170,
      dataIndex: "total",
      render: (text, record) =>
        BillingUtil.priceVarianceTotal(record.pVariance, text),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 150,
      render: (text, record) => (
        <Row justify="start" gutter={[8, 0]}>
          <Col span={8}>
            <Tooltip title="View / Edit">
              <Link onClick={() => props.onEditClick(record)}>
                <EditIcon />
              </Link>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Send Esitmate">
              <Link
                onClick={() =>
                  setSendEstimateData({
                    estimateId: record.id,
                    patientName: props.isClient
                      ? props.allPets.find(
                          (k) => k.patientId === record.patientId,
                        ).patientName
                      : props.patientName,
                  })
                }
              >
                <SendIcon />
              </Link>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      BillingUtil.downloadEstimate(record.id, commonContext)
                    }
                  >
                    {" "}
                    Download
                  </Menu.Item>
                </Menu>
              }
            >
              <Tooltip title="More Options">
                <MoreOutlined style={{ fontSize: "20px", color: "black" }} />
              </Tooltip>
            </Dropdown>
          </Col>
        </Row>
      ),
    },
  ];
  return (
    <>
      <AdvancedTable
        columns={columns}
        dataSource={props.estimateTableList}
        rowKey="id"
      />
      {sendEstimateData && (
        <SendEstimateDrawer
          inputData={{
            ...sendEstimateData,
            clientId: props.clientId,
            patientId: props.patientId,
          }}
          onClose={() => setSendEstimateData(null)}
          onSuccess={props.refreshData}
        />
      )}
    </>
  );
};

export default EstimateTableList;
