import React, { useRef } from "react";
import { Card, Statistic, Row, Col, Typography, Divider, Empty } from "antd";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { CardHeader } from "./CardHeader";
import HomePageEmptyBlock from "../../../home-page/HomePageEmptyBlocks";
const { Text } = Typography;

export const BarCard = (props) => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Adjust speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "16px",
        width: "100%",
        height: "270px", // Ensure the card has a fixed height
      }}
      className={`cardNumber`}
    >
      {/* Card Header with Icon */}
      <CardHeader
        onFilterChange={props.onFilterChange}
        selectedFilter={props.selectedFilter}
        icon={props.icon}
        title={props.title}
      />
      <div
        className="cardParent"
        ref={scrollRef}
        style={{
          width: "100%",
          height: "190px",
          overflowX: "auto",
          overflowY: "hidden",
          position: "relative",
          cursor: isDragging.current ? "grabbing" : "grab",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {props?.data?.length > 0 ? (
          <div
            style={{
              width: `${props?.data?.length * 120}px`,
              minWidth: "80%",
              height: "100%",
            }}
          >
            {props.stats != undefined && props.stats != null && (
              <div
                style={{ fontSize: "40px", position: "absolute", right: 30 }}
              >
                <Row>
                  <span style={{ fontSize: "15px" }}>Total</span>
                </Row>
                <Row>
                  <Statistic style={{ fontSize: "40px" }} value={props.stats} />
                </Row>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={props.data} barCategoryGap="30%">
                <XAxis
                  dataKey={props.barkey1 ? props.barkey1 : "category"}
                  tick={{ fontSize: 10, fill: "#555" }}
                />
                <YAxis
                  tick={{ fontSize: 14, fill: "#555" }}
                  domain={[0]}
                  tickFormatter={(value) =>
                    props.barkey2 === "totalRevenue" ? `$${value}` : value
                  }
                />
                <Tooltip />
                <Bar
                  dataKey={props.barkey2 ? props.barkey2 : "count"}
                  fill="#51ADC5"
                  barSize={12}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Data Available"
          />
        )}
      </div>
    </Card>
  );
};
