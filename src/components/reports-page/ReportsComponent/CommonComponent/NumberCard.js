import React from "react";
import { Card, Statistic, Row, Col, Typography, Divider } from "antd";
import { CardHeader } from "./CardHeader";
const { Text } = Typography;

export const NumberCard = (props) => {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "16px",
        width: "100%",
        height: "270px", // Ensure the card has a fixed height
      }}
      className={`cardNumber ${props.cardClass}`}
    >
      {/* Card Header with Icon */}
      <CardHeader
        onFilterChange={props.onFilterChange}
        onClick={props.onClick}
        selectedFilter={props.selectedFilter}
        icon={props.icon}
        title={props.title}
      />
      <div className={"cardParent"} style={{ width: "100%", height: "160px" }}>
        <Row className="ant-row-middle">
          <Col>
            <Statistic value={props.count} />
          </Col>
          <Col>
            <Text className="stat-period">{props.subtext}</Text>
          </Col>
        </Row>
        <Divider style={{ margin: "15px 0px" }} />
        <Row
          justify="space-between"
          align="middle"
          style={{ marginTop: "20px 0px" }}
        >
          <Col>
            <Text className="growth-text">Total :{props.stats}</Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};
