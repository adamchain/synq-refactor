import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import {
  Card,
  Statistic,
  Empty,
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
} from "antd";
import { TotalRevenueIcon } from "../../util/SvgUtil";
import { CardHeader } from "./CommonComponent/CardHeader";
import ReportServices from "../../../services/ReportServices";
import { localToUtc } from "../../util/TimeUtil";
const { Text, Link } = Typography;

// const revenueData = [
//     { name: "wk1", doctor: 200, technician: 240 },
//     { name: "wk2", doctor: 400, technician: 139 },
//     { name: "wk3", doctor: 300, technician: 400 },
//     { name: "wk4", doctor: 178, technician: 390 },
//     { name: "wk5", doctor: 689, technician: 480 },
//     { name: "wk6", doctor: 505, technician: 480 },
//     { name: "wk7", doctor: 450, technician: 480 },
//   ];

export const TotalRevenue = (props) => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [revenueData, setRevenueData] = useState([]);
  const [cardFilters, setCardFilters] = useState();
  const [totalBilled, setTotalBilled] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchData = () => {
      const filter = props.selectedFilter.toLowerCase();
      if (filter === "yearly") {
        ReportServices.drRevenue(
          filter,
          props.cardFilters,
          0,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              normalizedData(data.revenues);
            }
          },
        );
      } else if (filter === "monthly") {
        ReportServices.drRevenue(
          filter,
          new Date().getFullYear(),
          props.cardFilters,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              normalizedData(data.revenues);
            }
          },
        );
      } else if (filter === "weekly") {
        ReportServices.drRevenue(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          null,
          null,
          (data) => {
            if (isMounted) {
              normalizedData(data.revenues);
            }
          },
        );
      } else if (filter === "custom") {
        ReportServices.drRevenue(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          localToUtc(props?.dates?.startDate).format("YYYY-MM-DD"),
          localToUtc(props?.dates?.endDate).format("YYYY-MM-DD"),
          (data) => {
            if (isMounted) {
              normalizedData(data.revenues);
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

  const handleFilterChange = (value) => {
    setCardFilters(value);
  };

  const normalizedData = (responseData) => {
    const totalBilled = responseData[0].totalAmountBilled;
    if (totalBilled) {
      setTotalBilled(totalBilled.toFixed(2));
      const newData = Object.entries(responseData[0])
        .filter(([key]) => key !== "totalAmountBilled")
        .map(([key, value]) => ({
          name: key.replace(/_/g, " "),
          value,
        }));
      setRevenueData(newData);
    } else {
      setTotalBilled(null);
      setRevenueData([]);
    }
  };

  return (
    <Col sm={24} xl={12} xxl={6}>
      <Card
        onClick={props.onClick}
        bordered={false}
        style={{
          borderRadius: "16px",
          width: "100%",
          height: "300px", // Ensure the card has a fixed height
        }}
        className={"dash-card"}
      >
        <CardHeader
          onFilterChange={(value) => handleFilterChange(value)}
          selectedFilter={props.selectedFilter}
          icon={TotalRevenueIcon}
          title="Total Revenue"
        />
        {totalBilled != null && (
          <Row
            className="ant-row-middle ant-row-space-between"
            style={{ marginTop: "10px" }}
          >
            <Col>
              <Statistic
                value={totalBilled}
                prefix="$"
                style={{ fontSize: "21px", marginLeft: "15px" }}
              />
            </Col>

            <Col>
              {/* <Text style={{ color: '#3f8600', fontSize: '16px', fontWeight: 'bold' }}>
                +10.24% <ArrowUpOutlined style={{ color: '#3f8600' }} />
                </Text> */}
            </Col>
          </Row>
        )}
        <div
          className="overviewParent"
          ref={scrollRef}
          style={{
            width: "100%",
            height: "140px",
            overflowX: "hidden",
            overflowY: "hidden",
            position: "relative",
            cursor: isDragging.current ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {totalBilled == null ? (
            <div className="graph-container">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Data Available"
              />
            </div>
          ) : (
            <div className="graph-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    {/* Gradient definition for smooth fill */}
                    <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0FAD80" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0FAD80" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide />
                  <Tooltip
                    formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                  />
                  {/* Area to fill color under the line */}
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0FAD80"
                    fill="url(#colorFill)"
                    strokeWidth={2}
                    dot={false}
                  />
                  {/* Line for the border */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0FAD80"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </Card>
    </Col>
  );
};
