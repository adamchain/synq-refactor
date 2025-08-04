import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Col,
  Row,
  Typography,
  Modal,
  Select,
  Divider,
} from "antd";
import "./NotesModal.scss";
import PatientServices from "../../services/PatientServices";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const COMMUNICATION_TYPE = {
  1: { name: "Phone Call", value: 1 },
  3: { name: "Email", value: 3 },
  2: { name: "Text", value: 2 },
  4: { name: "Other", value: 4 },
};

const PURPOSE_TYPE = {
  1: { name: "Follow Up", value: 1 },
  4: { name: "General", value: 4 },
  2: { name: "Lab Results", value: 2 },
  3: { name: "Other", value: 3 },
  5: { name: "Estimate", value: 5 },
  6: { name: "Receipt", value: 6 },
};

const CommunicationModal = (props) => {
  const [communication, setCommunication] = useState({
    patientId: 0,
    type: 0,
    purpose: 0,
    text: "",
  });

  useEffect(() => {
    if (props.inputdata) {
      setCommunication(props.inputdata);
    }
  }, [props.inputdata]);

  return (
    <Modal
      title="Add Communication Entry"
      visible={true}
      onCancel={props.onClose}
      footer={null}
    >
      <>
        <Row>
          <Col span={24}>
            <Row style={{ marginBottom: 8 }}>
              <Col>
                <Text>Regarding Client</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 24 }}>
              <Col span={24}>
                <Select
                  showSearch={true}
                  value={communication.patientId}
                  size="large"
                  filterOption={(input, option) =>
                    option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value, option) => {
                    setCommunication((k) => ({ ...k, patientId: value }));
                  }}
                  placeholder={<Text>Select a Client</Text>}
                  style={{ width: "100%" }}
                >
                  {props.patientDetails?.map((k) => (
                    <Option key={k.id} value={k.id} data={k} extra={k.name}>
                      <Row>
                        <Col>
                          {" "}
                          <Text style={{ fontWeight: 500, lineHeight: "14px" }}>
                            {" "}
                            {k.name} <br />
                          </Text>
                          <Text
                            className="font-size-12"
                            style={{ fontWeight: 400, lineHeight: "12px" }}
                            type="secondary"
                          >
                            {k.breed}
                          </Text>
                        </Col>
                      </Row>
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row
              justify="space-between"
              gutter={[16, 0]}
              style={{ marginBottom: 8 }}
            >
              <Col span={12}>
                <Text>Type</Text>
              </Col>
              <Col span={12}>
                <Text>Purpose</Text>
              </Col>
            </Row>
            <Row
              justify="space-between"
              gutter={[16, 0]}
              style={{ marginBottom: 24 }}
            >
              <Col span={12}>
                <Select
                  showSearch={true}
                  value={communication.type}
                  size="large"
                  onChange={(value, option) => {
                    setCommunication((k) => ({ ...k, type: value }));
                  }}
                  placeholder={<Text>Select a Type</Text>}
                  style={{ width: "100%" }}
                >
                  {Object.values(COMMUNICATION_TYPE).map((k) => (
                    <Option key={k.value} value={k.value}>
                      <Text> {k.name} </Text>
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <Select
                  showSearch={true}
                  value={communication.purpose}
                  size="large"
                  onChange={(value, option) => {
                    setCommunication((k) => ({ ...k, purpose: value }));
                  }}
                  placeholder={<Text>Select a Purpose</Text>}
                  style={{ width: "100%" }}
                >
                  {Object.values(PURPOSE_TYPE).map((k) => (
                    <Option key={k.value} value={k.value}>
                      <Text> {k.name} </Text>
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginBottom: 8 }}>
              <Col>
                <Text>Description</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 24 }}>
              <Col span={24}>
                <TextArea
                  name="text"
                  rows={5}
                  placeholder="Enter notes about this communication"
                  value={communication.text}
                  onChange={(e) => {
                    let text = e.target.value;
                    setCommunication((k) => ({ ...k, text }));
                  }}
                />
              </Col>
            </Row>
            <Divider style={{ marginTop: "60px" }} />
            <Row justify="space-between" gutter={[16, 0]}>
              <Col span={12}>
                {" "}
                <Button
                  onClick={props.onClose}
                  shape="round"
                  size="large"
                  block
                >
                  Cancel
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  block
                  onClick={() => {
                    if (props.inputdata?.isEdit) {
                      props.editCommunication(communication);
                    } else {
                      props.saveCommunication(communication);
                    }
                    props.onClose();
                  }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default CommunicationModal;
