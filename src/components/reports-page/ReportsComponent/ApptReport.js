import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import React, { useEffect, useRef, useState } from "react";
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
import { ApptIcon } from "../../util/SvgUtil";
import { CardHeader } from "./CommonComponent/CardHeader";
import ReportServices from "../../../services/ReportServices";
import { localToUtc } from "../../util/TimeUtil";
const { Text, Link } = Typography;

const { Option } = Select;

// const appointmentData = [
//     { appt_type_name: "Consultation", count: 100 },
//     { appt_type_name: "Vaccinations", count: 80 },
//     { appt_type_name: "Dental Care", count: 60 },
//     { appt_type_name: "Surgery", count: 90 },
//     { appt_type_name: "Diagnostic", count: 110 },
//     { appt_type_name: "End-of-Life Care", count: 50 },
//     { appt_type_name: "Behavioral", count: 70 }
//   ];

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  const words = payload.value.split(" "); // Break words into multiple lines
  return (
    <g transform={`translate(${x},${y})`} style={{ marginTop: 15 }}>
      <text textAnchor="middle" fontSize={12} fill="#000">
        {words.map((word, index) => (
          <tspan x="0" dy={index === 0 ? "5" : "15"} key={index}>
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export const ApptReport = (props) => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [appointmentData, setAppointmentData] = useState([]);
  const [cardFilters, setCardFilters] = useState();

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchData = () => {
      const filter = props.selectedFilter.toLowerCase();
      if (filter === "yearly") {
        ReportServices.appointmentReport(
          filter,
          props.cardFilters,
          0,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              setAppointmentData(data);
            }
          },
        );
      } else if (filter === "monthly") {
        ReportServices.appointmentReport(
          filter,
          new Date().getFullYear(),
          props.cardFilters,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              setAppointmentData(data);
            }
          },
        );
      } else if (filter === "weekly") {
        ReportServices.appointmentReport(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          null,
          null,
          (data) => {
            if (isMounted) {
              setAppointmentData(data);
            }
          },
        );
      } else if (filter === "custom") {
        ReportServices.appointmentReport(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          localToUtc(props?.dates?.startDate).format("YYYY-MM-DD"),
          localToUtc(props?.dates?.endDate).format("YYYY-MM-DD"),
          (data) => {
            if (isMounted) {
              setAppointmentData(data);
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

  return (
    <Col sm={24} xl={18} xxl={18}>
      <Card
        bordered={false}
        style={{
          borderRadius: "16px",
          width: "100%",
          height: "420px",
        }}
        className={"dash-card"}
      >
        <CardHeader
          onFilterChange={(value) => handleFilterChange(value)}
          selectedFilter={props.selectedFilter}
          onClick={props.onClick}
          icon={ApptIcon}
          title="Clients"
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
          {appointmentData?.length == 0 ? (
            <div style={{ width: "100%", minWidth: "500px", height: "100%" }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Data Available"
              />
            </div>
          ) : (
            <div
              style={{
                width: `${appointmentData?.length * 90}px`,
                minWidth: "80%",
                height: "90%",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData} margin={{ bottom: 40 }}>
                  <XAxis
                    dataKey="appt_type_name"
                    interval={0}
                    tick={<CustomizedAxisTick />}
                    tickLine={false}
                    label={{
                      value: "Appointment Types",
                      position: "insideBottom",
                      offset: "-35", // Adjust to prevent cropping
                      style: {
                        fill: "#000",
                        fontWeight: 500,
                        fontSize: "14px",
                      },
                    }}
                  />
                  <YAxis allowDecimals={false} domain={[0, "auto"]} />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#008489"
                    barSize={30}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </Card>
    </Col>
  );
};
