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
const { Text } = Typography;

export const Bar3Card = (props) => {
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
      className={`cardNumber dash-card`}
    >
      <CardHeader
        onFilterChange={props.onFilterChange}
        onClick={props.onClick}
        selectedFilter={props.selectedFilter}
        icon={props.icon}
        title={props.title}
      />
      {/* <div style={{ width: "100%",height: "190px", padding:'10px 0px'}}> */}
      <div
        className="cardParent"
        ref={scrollRef}
        style={{
          width: "100%",
          height: "200px",
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
        {props?.data?.length == 0 ? (
          <div style={{ width: "100%", height: "202px", marginTop: "10px" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Data Available"
            />
          </div>
        ) : (
          <div
            style={{
              width: `${props?.data?.length * 150}px`,
              minWidth: "80%",
              height: "175px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={props.data}>
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }} // Adjust font size for better visibility
                  interval={0} // Show all labels
                />
                {/* <YAxis /> */}
                <Tooltip
                  formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                />
                <Bar
                  dataKey="totalCost"
                  stackId="a"
                  fill="#5C6CD1"
                  name="Cost"
                  barSize={25}
                />
                <Bar
                  dataKey="totalDiscount"
                  stackId="a"
                  fill="#2CC6AE"
                  name="Margin"
                  barSize={25}
                />
                <Bar
                  dataKey="totalPrice"
                  stackId="a"
                  fill="#1B3738"
                  name="Price"
                  barSize={25}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
};
