import React from "react";
import { Col, Row, Card, Typography, Button, Modal } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { Text } = Typography;

const IdexxDeviceModal = (props) => {
  const DeviceDetail = ({ device }) => {
    return (
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card
            className="patient-custom-card"
            bodyStyle={{ padding: "1em" }}
            onClick={() => props.onSuccess(device.deviceSerialNumber)}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Row justify="start" align="middle" gutter={[16, 0]}>
                  <Col>
                    <Row style={{ marginBottom: "-6px" }}>
                      <Col>
                        <Text className="patient-card-child-name">
                          {device.displayName + "-" + device.deviceSerialNumber}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text
                          className="patient-card-child-breed"
                          type="secondary"
                        >
                          {device.vcpActivatedStatus}
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
      title="Device Select"
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
            Idexx has multiple deices. Please select a device for this test
          </Text>
        </Col>
      </Row>
      {props.data.map((k) => (
        <DeviceDetail key={k.deviceSerialNumber} device={k} />
      ))}
    </Modal>
  );
};

export default IdexxDeviceModal;
