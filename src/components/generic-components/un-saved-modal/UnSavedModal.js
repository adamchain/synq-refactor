import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Col,
  Divider,
  Layout,
  Menu,
  Row,
  Typography,
  Button,
  Modal,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;
const UnSavedModal = ({ onDisregard, onContinue }) => {
  const unmount = () => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("unsaved-modal-id"),
    );
  };
  return (
    <Modal footer={null} closable={false} visible={true}>
      <Row
        align="middle"
        gutter={[8, 0]}
        style={{ marginTop: "2em", marginBottom: "1em" }}
      >
        <Col>
          <InfoCircleOutlined style={{ color: "orange", fontSize: "1.5em" }} />
        </Col>
        <Col>
          <Text style={{ fontSize: "1.2em" }} strong>
            You Have Unsaved Changes
          </Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          You have made changes that have not been saved. Would you like to
          continue editing or disregard them?
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {" "}
          <Button
            onClick={() => {
              onDisregard();
              unmount();
            }}
            shape="round"
            size="large"
            block
          >
            Disregard Changes
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            onClick={() => {
              onContinue();
              unmount();
            }}
          >
            Continue Editing
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

const callUnSavedModal = (onDisregard, onContinue) => {
  ReactDOM.render(
    <UnSavedModal onDisregard={onDisregard} onContinue={onContinue} />,
    document.getElementById("unsaved-modal-id"),
  );
};
export default UnSavedModal;
export { callUnSavedModal };
