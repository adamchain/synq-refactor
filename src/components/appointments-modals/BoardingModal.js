import React, { useState, useEffect } from "react";
import {
  Row,
  Button,
  DatePicker,
  Modal,
  Typography,
  Col,
  Select,
  Checkbox,
  Input,
  TimePicker,
} from "antd";

import "./AppointmentModal.scss";

import AppointmentServices from "./../../services/AppointmentServices";

import { localToUtc, momentLocal, utcToLocal } from "../util/TimeUtil";
import PatientServices from "../../services/PatientServices";

const { Text } = Typography;
const { Option } = Select;

const BoardingModal = (props) => {
  const [requiredInputData, setRequiredInputData] = useState({
    patientDetails: [],
  });
  const [boardingData, setBoardingData] = useState({
    patientId: null,
    kennelSlot: null,
    dateRange: [],
  });

  useEffect(() => {
    PatientServices.fetchAllPatients((data) =>
      setRequiredInputData((k) => ({ ...k, patientDetails: data })),
    );
  }, []);

  useEffect(() => {
    if (props.data) {
      let startTime = momentLocal(
        props.data.stDate + " " + props.data.stTime,
        "YYYY-MM-DD HH:mm:ss",
      );
      let endTime = momentLocal(
        props.data.endDate + " " + props.data.endTime,
        "YYYY-MM-DD HH:mm:ss",
      );

      let inputData = {
        userId: props.data.usrId,
        isAllDay: !!props.data.allDay,
        reason: props.data.reason,
        dateRange: [startTime, endTime],
        timeRange: [startTime, endTime],
      };
      setBoardingData(inputData);
    }
  }, [props.data]);

  const handleSubmit = () => {};

  return (
    <Modal
      className="boarding-modal"
      visible={true}
      title={(props.isEdit ? "Edit" : "Create") + " Boarding Visit"}
      onCancel={props.onClose}
      footer={[
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button shape="round" block onClick={props.onClose}>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button block type="primary" shape="round" onClick={handleSubmit}>
              Save
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <>
        {" "}
        <Row style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Patient Name</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <Select
              showSearch={true}
              value={boardingData.patientId}
              filterOption={(input, option) =>
                option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                setBoardingData((k) => ({ ...k, patientId: value }));
              }}
              placeholder={<Text>Select a Patient</Text>}
              style={{ width: "100%" }}
            >
              {requiredInputData.patientDetails.map((k) => (
                <Option key={k.id} value={k.id} extra={k.name}>
                  <Row>
                    <Col>{k.name}</Col>
                  </Row>
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Kennel slot</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <Select
              showSearch={true}
              value={boardingData.kennelSlot}
              filterOption={(input, option) =>
                option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                setBoardingData((k) => ({ ...k, kennelSlot: value }));
              }}
              placeholder={<Text>Select a Slot</Text>}
              style={{ width: "100%" }}
            >
              {
                <Option key={1} value={1} extra={"KennelSlot 1"}>
                  <Row>
                    <Col>{"Kennel Slot 1"}</Col>
                  </Row>
                </Option>
              }
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col span={24}>
            <Text>Date</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <DatePicker.RangePicker
              value={boardingData.dateRange}
              onChange={(d) => setBoardingData((k) => ({ ...k, dateRange: d }))}
              format="MM/DD/YYYY"
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};
export default BoardingModal;
