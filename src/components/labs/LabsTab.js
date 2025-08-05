import React, { useState, useContext } from "react";
import { Col, Row, Typography, Button, Input } from "antd";
import "./Labs.scss";

import LabHistoryTable from "./LabHistoryTable";
import NewLabsTable from "./NewLabsTable";
import LabDrawer from "./LabDrawer";
import { CommonContext } from "../../context/CommonContext";

const { Title } = Typography;

// const newLabsData = [{
//     status :"NOT STARTED",
//     id:100,
//     name:"T805 - Fecal with Centrifugation"
//   },
//   {
//     status :"READY",
//     id:101,
//     name:"28199999 - IDX-Senior Screen w/4DX Plus"
//   },
//   {
//     status :"PROCESSING",
//     id:102,
//     name:"T805 - Fecal with Centrifugation"
//   },
//   {
//       status :"COMPLETED",
//       id:103,
//       name:"28199999 - Zoetis Senior Screen w/4DX Plus"
//     },
//     {
//       status :"ERROR",
//       id:104,
//       name:"28199999 - Zoetis Senior Screen w/4DX Plus"
//     }];

const LabsTab = (props) => {
  const [openLabDrawer, setOpenLabDrawer] = useState(false);
  const [newLabsTableData, setNewLabsTableData] = useState([]);
  const context = useContext(CommonContext);

  return (
    <>
      {props.showNewLabs && (
        <>
          <Row>
            <Col span={24} className="table-title-top">
              <Row justify="space-between" align="middle" gutter={[0, 16]}>
                <Col>
                  <Title level={5}>New Labs</Title>
                </Col>
                {context.userProfile.permission !== "FD" && (
                  <Col>
                    <Button
                      ghost
                      shape="round"
                      size="small"
                      type="primary"
                      style={{ minWidth: "130px" }}
                      onClick={() => {
                        setOpenLabDrawer(true);
                      }}
                      disabled={props.addNewLabs}
                    >
                      Add Lab
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          <Row style={{ marginBottom: 24 }} gutter={[0, 24]}>
            <Col span={24}>
              <NewLabsTable
                newLabsTableData={props.labsData?.filter(
                  (k) => k.appt === props.inputIds.apptId,
                )}
                refreshTableData={() => props.onSuccessLabTest()}
              />
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col span={24} className="table-title-top">
          <Row justify="space-between" align="middle" gutter={[0, 16]}>
            <Col>
              <Title level={5}>Lab History</Title>
            </Col>
          </Row>
        </Col>
      </Row>
      <LabHistoryTable
        historyLabsTableData={props.labsData.filter(
          (k) => k.appt !== props.inputIds.apptId,
        )}
        refreshTableData={() => props.onSuccessLabTest()}
      />
      {openLabDrawer && (
        <LabDrawer
          onClose={() => setOpenLabDrawer(false)}
          onSuccess={() => {
            props.onSuccessLabTest();
            setOpenLabDrawer(false);
          }}
          inputIds={props.inputIds}
        />
      )}
    </>
  );
};

export default LabsTab;
