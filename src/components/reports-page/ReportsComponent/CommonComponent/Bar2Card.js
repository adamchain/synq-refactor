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

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  const MAX_LENGTH = 10; // Set max character length before truncating

  const truncatedText =
    payload.value.length > MAX_LENGTH
      ? `${payload.value.substring(0, MAX_LENGTH)}...`
      : payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" fontSize={12} fill="#000">
        <tspan x="0" dy="5">
          {truncatedText}
        </tspan>
      </text>
    </g>
  );
};

export const Bar2Card = (props) => {
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
            style={{ width: `${props?.data?.length * 100}px`, height: "170px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  tick={<CustomizedAxisTick />}
                  dataKey={props.barkey1}
                  interval={0} // Show all labels
                />
                {/* <YAxis /> */}
                <Tooltip />
                <Bar
                  dataKey={props.barkey2}
                  stackId="a"
                  fill="#1EC0BF"
                  barSize={25}
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
