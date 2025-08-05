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

import AppointmentServices from "./../../services/AppointmentServices";

import { localToUtc, momentLocal, utcToLocal } from "../util/TimeUtil";
import PatientServices from "../../services/PatientServices";
import ClientServices from "../../services/ClientServices";
import HistoryServices from "../../services/HistoryServices";
import LabServices from "../../services/LabServices";

const { Text } = Typography;
const { Option } = Select;

const AssignLabModal = (props) => {
  const [requiredInputData, setRequiredInputData] = useState({
    patientDetails: [],
    clientDetails: [],
    apptDetails: [],
  });
  const [modalData, setModalData] = useState({
    clientId: null,
    patientId: null,
    apptId: null,
  });

  useEffect(() => {
    ClientServices.getAllClients((data) =>
      setRequiredInputData((k) => ({ ...k, clientDetails: data })),
    );
  }, []);

  useEffect(() => {
    if (modalData.clientId) {
      setModalData((k) => ({ ...k, patientId: null, apptId: null }));
      setRequiredInputData((k) => ({
        ...k,
        patientDetails: [],
        apptDetails: [],
      }));
      ClientServices.fetchPatientByClientId(modalData.clientId, (data) => {
        setRequiredInputData((k) => ({ ...k, patientDetails: data }));
        if (data.length === 1) {
          setModalData((k) => ({ ...k, patientId: data[0].patientId }));
        }
      });
    }
  }, [modalData.clientId]);

  useEffect(() => {
    if (modalData.patientId) {
      setModalData((k) => ({ ...k, apptId: null }));
      setRequiredInputData((k) => ({ ...k, apptDetails: [] }));
      HistoryServices.getAppointmentHistoryByPatientId(
        "?stDate=" +
          localToUtc(momentLocal().day(-14)).format("YYYY-MM-DD") +
          "&endDate=" +
          localToUtc(momentLocal()).format("YYYY-MM-DD"),
        modalData.patientId,
        (data) => {
          setRequiredInputData((k) => ({ ...k, apptDetails: data }));
          if (data.length === 1) {
            setModalData((k) => ({ ...k, apptId: data[0].id }));
          }
        },
      );
    }
  }, [modalData.patientId]);

  // useEffect(()=>{
  //    if(props.data){

  //     setModalData(props.data);
  //    }
  // },[props.data])

  const handleSubmit = () => {
    let submitData = {
      orderId: props.data.id,
      ...modalData,
    };
    LabServices.updateOrphanOrder(submitData, () => {
      props.onClose();
      props.onRefresh();
    });
  };

  return (
    <Modal
      className="assign-patient-modal"
      visible={true}
      title={"Assign Lab"}
      onCancel={props.onClose}
      footer={[
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button shape="round" block onClick={props.onClose}>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              type="primary"
              shape="round"
              disabled={
                !(modalData.apptId && modalData.patientId && modalData.clientId)
              }
              onClick={handleSubmit}
            >
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
            <Text>Select Client</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <Select
              showSearch={true}
              value={modalData.clientId}
              filterOption={(input, option) =>
                option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                setModalData((k) => ({ ...k, clientId: value }));
              }}
              placeholder={<Text>Select a Client</Text>}
              style={{ width: "100%" }}
            >
              {requiredInputData.clientDetails.map((k) => {
                let name = k.primary?.firstName + " " + k.primary?.lastName;
                return (
                  <Option key={k.clientId} value={k.clientId} extra={name}>
                    <Row>
                      <Col>{name}</Col>
                    </Row>
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Select Patient</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <Select
              showSearch={true}
              disabled={!modalData.clientId}
              value={modalData.patientId}
              filterOption={(input, option) =>
                option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                setModalData((k) => ({ ...k, patientId: value }));
              }}
              placeholder={<Text>Select a Patient</Text>}
              style={{ width: "100%" }}
            >
              {requiredInputData.patientDetails.map((k) => (
                <Option
                  key={k.patientId}
                  value={k.patientId}
                  extra={k.patientName}
                >
                  <Row>
                    <Col>{k.patientName}</Col>
                  </Row>
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Select Appointment</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <Select
              showSearch={true}
              disabled={!modalData.patientId}
              value={modalData.apptId}
              filterOption={(input, option) =>
                option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                setModalData((k) => ({ ...k, apptId: value }));
              }}
              placeholder={<Text>Select an Appointment</Text>}
              style={{ width: "100%" }}
            >
              {requiredInputData.apptDetails.map((k) => {
                let name =
                  k.date.format("MM/DD/YYYY") +
                  " | " +
                  k.type +
                  " | " +
                  k.notes;
                return (
                  <Option key={k.id} value={k.id} extra={name}>
                    <Row>
                      <Col>{name}</Col>
                    </Row>
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </>
    </Modal>
  );
};
export default AssignLabModal;
