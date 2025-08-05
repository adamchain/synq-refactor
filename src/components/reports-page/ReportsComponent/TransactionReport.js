import {
  LineChart,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Statistic,
  DatePicker,
  Space,
  Typography,
  Layout,
  Select,
  Button,
  Row,
  Col,
  Tag,
  Divider,
  Modal,
  Popconfirm,
  Empty,
} from "antd";
import {
  InvProceduresIcon,
  TotalRevenueIcon,
  TransactionIcon,
} from "../../util/SvgUtil";
import { CardHeader } from "./CommonComponent/CardHeader";
import ReportServices from "../../../services/ReportServices";
import { localToUtc } from "../../util/TimeUtil";
const { Text, Link } = Typography;

const COLORS = ["#44BF9C", "#8D99E2", "#2A7E81"];

// const transactionData = [
//     { name: "Credit", value: 60 },
//     { name: "Cash", value: 30 },
//     { name: "Check", value: 10 },
//   ];

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "12px", fontWeight: "bold" }}
    >
      {`${(percent * 100).toFixed(0)}%`}{" "}
      {/* Show percentage inside the slice */}
    </text>
  );
};

export const TransactionReport = (props) => {
  const [transactionData, setTransactionData] = useState([]);
  const [cardFilters, setCardFilters] = useState();
  const [data, setData] = useState();
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchData = () => {
      const filter = props.selectedFilter.toLowerCase();
      if (filter === "yearly") {
        ReportServices.billingByPercentage(
          filter,
          props.cardFilters,
          0,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              const transformedData = [
                { name: "Card", value: Math.round(data.Card) }, // Round the value
                { name: "Cash", value: Math.round(data.Cash) },
                { name: "Check", value: Math.round(data.Check) },
              ];
              setData(data);
              setTransactionData(transformedData);
            }
          },
        );
      } else if (filter === "monthly") {
        ReportServices.billingByPercentage(
          filter,
          new Date().getFullYear(),
          props.cardFilters,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              const transformedData = [
                { name: "Card", value: Math.round(data.Card) }, // Round the value
                { name: "Cash", value: Math.round(data.Cash) },
                { name: "Check", value: Math.round(data.Check) },
              ];
              setData(data);
              setTransactionData(transformedData);
            }
          },
        );
      } else if (filter === "weekly") {
        ReportServices.billingByPercentage(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          null,
          null,
          (data) => {
            if (isMounted) {
              const transformedData = [
                { name: "Card", value: Math.round(data.Card) }, // Round the value
                { name: "Cash", value: Math.round(data.Cash) },
                { name: "Check", value: Math.round(data.Check) },
              ];

              setData(data);
              setTransactionData(transformedData);
            }
          },
        );
      } else if (filter === "custom") {
        ReportServices.billingByPercentage(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          localToUtc(props?.dates?.startDate).format("YYYY-MM-DD"),
          localToUtc(props?.dates?.endDate).format("YYYY-MM-DD"),
          (data) => {
            if (isMounted) {
              const transformedData = [
                { name: "Card", value: Math.round(data.Card) }, // Round the value
                { name: "Cash", value: Math.round(data.Cash) },
                { name: "Check", value: Math.round(data.Check) },
              ];

              setData(data);
              setTransactionData(transformedData);
            }
          },
        );
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [props.selectedFilter, props.cardFilters, props?.dates]);

  const handleFilterChange = (value) => {
    setCardFilters(value);
  };

  const CustomNameLabels = ({ cx, cy, midAngle, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30; // Position names outside the chart
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN) + index * 7;

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "14px" }}
      >
        {transactionData[index].name}
      </text>
    );
  };

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
    <Col sm={24} xl={6} xxl={6}>
      <Card
        bordered={false}
        style={{
          borderRadius: "16px",
          width: "100%",
          height: "420px", // Ensure the card has a fixed height
        }}
        className={"dash-card"}
      >
        <CardHeader
          onFilterChange={(value) => handleFilterChange(value)}
          onClick={props.onClick}
          selectedFilter={props.selectedFilter}
          icon={TransactionIcon}
          title="Transactions"
        />
        <div
          className="overviewParent"
          ref={scrollRef}
          style={{
            width: "100%",
            height: "340px",
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
          {data?.TotalCash == 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Data Available"
            />
          ) : (
            <>
              <div
                style={{ width: `285px`, minWidth: "285px", height: "100%" }}
              >
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={transactionData}
                      dataKey="value"
                      outerRadius={80}
                      label={CustomLabel} // Percentages inside the slices
                    >
                      {transactionData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                {/* Custom Legend Below the Pie Chart */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  {transactionData.map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "15px",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: COLORS[index % COLORS.length],
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      />
                      <Text
                        style={{
                          fontSize: "14px",
                          color: COLORS[index % COLORS.length],
                        }}
                      >
                        {entry.name}
                      </Text>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontWeight: "600" }}>
                    Payment Method Distribution
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </Col>
  );
};
