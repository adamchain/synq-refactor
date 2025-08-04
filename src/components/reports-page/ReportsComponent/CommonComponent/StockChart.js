import React from "react";
import { Card, Row, Col, Statistic, Divider, Tooltip } from "antd";
import { CardHeader } from "./CardHeader";

const StockChart = (props) => {
  // Define mapping for names and colors
  const stockMapping = {
    inStock: { name: "In Stock", color: "#2ECC71" }, // Green
    lowStock: { name: "Low Stock", color: "#F1C40F" }, // Yellow
    OutOfStock: { name: "Out of Stock", color: "#E74C3C" }, // Red
  };

  // Transform API response into the desired format
  const normalizedData = Object.entries(props.data)
    .filter(([key]) => key !== "filterType")
    .map(([key, value]) => ({
      name: stockMapping[key]?.name || key,
      value: value || 0,
      color: stockMapping[key]?.color || "#000",
    }));

  // Calculate total for progress percentage
  const total = normalizedData.reduce((sum, item) => sum + item.value, 0);

  const progressPercentages = normalizedData.map((item) => ({
    ...item,
    percentage: total ? (item.value / total) * 100 : 0,
  }));

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "16px",
        width: "100%",
        height: "270px", // Ensure the card has a fixed height
      }}
      className={`cardNumber  dash-card`}
    >
      <CardHeader
        onFilterChange={props.onFilterChange}
        onClick={props.onClick}
        selectedFilter={props.selectedFilter}
        icon={props.icon}
        title={props.title}
      />
      <div className={"cardParent"} style={{ width: "100%", height: "160px" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginTop: "20px 0px" }}
        >
          <Col>
            {/* <p style={{display:'block'}}>TOTAL ITEMS</p> */}
            <Statistic
              title="Total Items :"
              value={total}
              style={{ fontSize: "36px" }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Progress Bar */}
            <div style={{ marginTop: "20px", padding: "0 10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "5px",
                    position: "relative",
                    display: "flex",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  {progressPercentages.map((item, index) => (
                    <Tooltip
                      key={index}
                      title={`${item.name}: ${item.value} (${item.percentage.toFixed(
                        1,
                      )}%)`}
                      placement="top"
                    >
                      <div
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                          height: "100%",
                          marginRight: "2px",
                          borderRadius: "5px",
                        }}
                      ></div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>

            {/* Labels */}
            <div style={{ padding: "10px 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {progressPercentages.map((item) => (
                  <span
                    key={item.name}
                    style={{ color: item.color, marginRight: 5 }}
                  >
                    {item.name}: {item.value}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default StockChart;
