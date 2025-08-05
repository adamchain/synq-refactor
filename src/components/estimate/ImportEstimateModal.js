import React from "react";
import { Col, Row, Card, Typography, Button, Modal, Tag } from "antd";

import "./Estimate.scss";
import { ESTIMATE_STATUS } from "./EstimateHelper";
import PriceUtil from "../util/PriceUtil";
import { utcToLocal } from "../util/TimeUtil";
const { Text } = Typography;

const ImportEstimateModal = (props) => {
  const EstimateCard = ({ estimate, onEstimateClick }) => {
    return (
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card
            className="patient-custom-card"
            onClick={() => onEstimateClick(estimate.id)}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Row gutter={[0, 8]}>
                  <Col>
                    {" "}
                    <Text>
                      {utcToLocal(estimate.date, "YYYY-MM-DDTHH:mm:ss").format(
                        "MM/DD/YYYY",
                      )}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <Text strong>{estimate.name}</Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row gutter={[0, 8]} justify="end">
                  <Col>
                    {" "}
                    <Text className="estimateModalPrice" secondary>
                      {PriceUtil.dollarValue(estimate.total)}
                    </Text>{" "}
                  </Col>
                </Row>
                <Row justify="end">
                  <Col>
                    <Tag
                      color={
                        Object.values(ESTIMATE_STATUS).find(
                          (k) =>
                            k.desc === estimate.status.toUpperCase().trim(),
                        ).color
                      }
                    >
                      {" "}
                      {estimate.status.toUpperCase()}
                    </Tag>{" "}
                  </Col>
                </Row>
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
      title="Import Estimate"
      footer={
        <Button shape="round" onClick={() => props.onClose(false)} block>
          Cancel
        </Button>
      }
    >
      {props.estimateList.map((k) => (
        <EstimateCard estimate={k} onEstimateClick={props.onEstimateClick} />
      ))}
    </Modal>
  );
};

export default ImportEstimateModal;
