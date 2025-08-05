import React from "react";
import { Col, Row, Card, Typography, Button, Modal } from "antd";
import { RightOutlined } from "@ant-design/icons";
import CustomImage from "../generic-components/custom-image/CustomImage";
import "./Estimate.scss";
const { Text } = Typography;

const PatientEstimateModal = (props) => {
  const PatientDetail = ({ pet, onPatientClick }) => {
    return (
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card
            className="patient-custom-card"
            bodyStyle={{ padding: "1em" }}
            onClick={() => onPatientClick(pet.patientId)}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Row justify="start" align="middle" gutter={[16, 0]}>
                  <Col>
                    <CustomImage
                      styling={{
                        width: "50px",
                        height: "50px",
                        showOuterBorder: true,
                        url: `url(` + pet?.image + `)`,
                        fullName: "", // pass dynamic full name
                      }}
                    />
                  </Col>
                  <Col>
                    <Row style={{ marginBottom: "-6px" }}>
                      <Col>
                        <Text className="patient-card-child-name">
                          {pet.patientName}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text
                          className="patient-card-child-breed"
                          type="secondary"
                        >
                          {pet.breedName}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col>
                <RightOutlined />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  };
  return (
    <Modal
      className="patient-estimate-modal"
      visible={true}
      onCancel={() => props.onClose(false)}
      title="Patient Select"
      footer={[
        <Row>
          <Col span={24}>
            <Button
              shape="round"
              onClick={() => props.onClose(false)}
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Row gutter={[0, 16]}>
        <Col className="modalDescription">
          <Text>
            This client has multiple pets. Please select a patient for this
            estimate
          </Text>
        </Col>
      </Row>
      {props.activePets.map((k) => (
        <PatientDetail
          key={k.patientId}
          pet={k}
          onPatientClick={props.onPatientClick}
        />
      ))}
    </Modal>
  );
};

export default PatientEstimateModal;
