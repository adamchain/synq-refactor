import React, { useState } from "react";
import { Row, Col, Typography, Radio, Button } from "antd";
import GeneralAnestheticForm from "./general-anesthesia/GeneralAnestheticForm";
import MedicationDetails from "./medication/MedicationDetails";
import VitalTracker from "./vital-tracker/VitalTracker";
import { useRef } from "react";

const { Title } = Typography;

const AnesthesiaTab = (props) => {
  const [anestheticType, setAnestheticType] = useState("General");
  const generalRef = useRef();

  return (
    <>
      <Row justify="space-between" align="middle" gutter={[0, 16]}>
        <Col className="table-title-top">
          <Title level={5}>Anesthetic Monitoring</Title>
        </Col>
      </Row>
      <Row
        style={{ marginBottom: "24px" }}
        justify="space-between"
        align="middle"
        gutter={[0, 16]}
      >
        <Col>
          <Radio.Group
            value={anestheticType}
            onChange={(e) => {
              if (e.target.value !== "General" && generalRef.current) {
                generalRef.current.updateForm();
              }
              setAnestheticType(e.target.value);
            }}
          >
            <Radio.Button value="General">General</Radio.Button>
            <Radio.Button value="Medication"> Medication</Radio.Button>
            <Radio.Button value="Vital Tracking">Vital Tracking</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {anestheticType === "General" && (
        <GeneralAnestheticForm
          ref={generalRef}
          apptId={props.apptId}
          patientId={props.patientId}
          doctorDetails={props.doctorDetails}
        />
      )}
      {anestheticType === "Medication" && (
        <MedicationDetails apptId={props.apptId} patientId={props.patientId} />
      )}
      {anestheticType === "Vital Tracking" && (
        <VitalTracker apptId={props.apptId} patientId={props.patientId} />
      )}
    </>
  );
};

export default AnesthesiaTab;
