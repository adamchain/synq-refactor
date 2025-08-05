import React, { useState, useEffect } from "react";
import { Col, Row, Typography, Button, message } from "antd";
import "./Estimate.scss";

import EstimateTableList from "./EstimateTableList";
import EstimateDrawer from "./EstimateDrawer";
import PatientEstimateModal from "./PatientEstimateModal";
import EstimateServices from "../../services/EstimateServices";

const { Title } = Typography;

const EstimateTab = (props) => {
  const [estimateObject, setEstimateObject] = useState(null);
  const [patientSelect, setPatientSelect] = useState(null);
  const [estimateTableList, setEstimateTableList] = useState([]);

  const estimateSearch = () => {
    if (!props.isClient && props.patientId) {
      EstimateServices.searchEstimateByPatientId(
        props.patientId,
        setEstimateTableList,
      );
    } else if (props.isClient && props.clientId) {
      EstimateServices.searchEstimateByClientId(
        props.clientId,
        setEstimateTableList,
      );
    }
  };

  const determinePatientSelect = () => {
    let activePets = props.allPets.filter((k) => k.status === "Active");
    switch (activePets.length) {
      case 0:
        message.error("No Active Pets available to create Estimate");
        break;
      case 1:
        setEstimateObject({
          isEdit: false,
          patientId: activePets[0].patientId,
        });
        break;
      default:
        setPatientSelect(activePets);
    }
  };

  useEffect(() => {
    estimateSearch();
  }, [props.isClient]);
  return (
    <>
      <Row>
        <Col span={24}>
          <Row
            justify="space-between"
            className="table-title-top"
            align="middle"
            gutter={[0, 16]}
          >
            <Col>
              <Title level={5}>Estimate History</Title>
            </Col>
            <Col>
              <Button
                className="setWidthTableButtons"
                ghost
                shape="round"
                size="small"
                type="primary"
                onClick={() =>
                  props.isClient
                    ? determinePatientSelect()
                    : setEstimateObject({ isEdit: false })
                }
              >
                Create Estimate
              </Button>
            </Col>
          </Row>
          <EstimateTableList
            estimateTableList={estimateTableList}
            patientName={props.patientName}
            isClient={props.isClient}
            clientId={props.clientId}
            patientId={props.patientId}
            allPets={props.allPets}
            clientLastName={props.clientLastName}
            refreshData={() => estimateSearch()}
            onEditClick={(record) => {
              EstimateServices.getEstimateById(record.id, (data) =>
                setEstimateObject({
                  isEdit: true,
                  data: { client: record.client, ...data },
                  patientId: data.patient.id,
                }),
              );
            }}
          />
        </Col>
      </Row>
      {estimateObject && (
        <EstimateDrawer
          patientName={props.patientName}
          onClose={() => setEstimateObject(null)}
          petData={
            props.isClient
              ? props.allPets.find(
                  (k) => k.patientId === estimateObject.patientId,
                )
              : props.petData
          }
          isEdit={estimateObject.isEdit}
          clientLastName={props.clientLastName}
          onSuccess={() => {
            estimateSearch();
            setEstimateObject(null);
          }}
          estimateData={{
            ...estimateObject.data,
            patient: {
              id: props.isClient ? estimateObject.patientId : props.patientId,
            },
            client: { id: props.clientId },
          }}
        />
      )}
      {patientSelect && (
        <PatientEstimateModal
          activePets={patientSelect}
          onPatientClick={(patientId) => {
            setEstimateObject({ isEdit: false, patientId });
            setPatientSelect(null);
          }}
          onClose={() => setPatientSelect(null)}
        />
      )}
    </>
  );
};

export default EstimateTab;
