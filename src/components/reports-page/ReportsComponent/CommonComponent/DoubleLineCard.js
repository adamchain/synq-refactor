import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Empty } from "antd";
import { StaffPfc } from "../../../util/SvgUtil";
import { CardHeader } from "./CardHeader";

// const data = [
//     { name: "wk1", vaccine: 400, prescription: 240 },
//     { name: "wk2", vaccine: 300, prescription: 139 },
//     { name: "wk3", vaccine: 200, prescription: 400 },
//     { name: "wk4", vaccine: 278, prescription: 390 },
//     { name: "wk5", vaccine: 189, prescription: 480 },
//   ];

export const DoubleLineCard = (props) => {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const newdata = transformApiResponse(props.data);
    setData(newdata);
  }, [props.data]);

  function transformApiResponse(response) {
    const vaccineData = response.vaccines?.[0] || {}; // Default to an empty object if undefined
    const prescriptionData = response.meds?.[0] || {}; // Default to an empty object if undefined

    // Generate the desired data format
    const transformedData = Object.keys(vaccineData)
      .filter((key) => key !== "totalAmountBilled") // Exclude non-week keys
      .map((key) => ({
        name: key,
        vaccine: vaccineData[key] || 0,
        prescription: prescriptionData[key] || 0,
      }));

    return transformedData;
  }
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
    >
      {/* Card Header with Icon */}
      <CardHeader
        onFilterChange={props.onFilterChange}
        selectedFilter={props.selectedFilter}
        icon={props.icon}
        title={props.title}
      />
      <div
        className={"cardParent"}
        ref={scrollRef}
        style={{
          width: "100%",
          height: "160px",
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
        {data?.length > 0 ? (
          <div style={{ width: `${data?.length * 50}px`, height: "160px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="vaccine" stroke="#07C2BC" />
                <Line type="monotone" dataKey="prescription" stroke="#E83151" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
              </LineChart>
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
