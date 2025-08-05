import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Col, Empty } from "antd";
import { StaffPfc } from "../../util/SvgUtil";
import { CardHeader } from "./CommonComponent/CardHeader";
import ReportServices from "../../../services/ReportServices";
import { localToUtc } from "../../util/TimeUtil";

const revenueData = [
  { name: "wk1", doctor: 400, technician: 240 },
  { name: "wk2", doctor: 300, technician: 139 },
  { name: "wk3", doctor: 200, technician: 400 },
  { name: "wk4", doctor: 278, technician: 390 },
  { name: "wk5", doctor: 189, technician: 480 },
];

export const StaffReport = (props) => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [appointmentData, setAppointmentData] = useState([]);
  //const [cardFilters, setCardFilters] = useState()

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchData = () => {
      const filter = props.selectedFilter.toLowerCase();
      if (filter === "yearly") {
        ReportServices.apptCount(
          filter,
          props.cardFilters,
          0,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              setAppointmentData(data.revenues);
            }
          },
        );
      } else if (filter === "monthly") {
        ReportServices.apptCount(
          filter,
          new Date().getFullYear(),
          props.cardFilters,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              setAppointmentData(data.revenues);
            }
          },
        );
      } else if (filter === "weekly") {
        ReportServices.apptCount(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          null,
          null,
          (data) => {
            if (isMounted) {
              setAppointmentData(data.revenues);
            }
          },
        );
      } else if (filter === "custom") {
        ReportServices.apptCount(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          localToUtc(props?.dates?.startDate).format("YYYY-MM-DD"),
          localToUtc(props?.dates?.endDate).format("YYYY-MM-DD"),
          (data) => {
            if (isMounted) {
              setAppointmentData(data.revenues);
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
    //setCardFilters(value);
  };

  return (
    <Col sm={24} xl={12} xxl={6}>
      <Card
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
          onClick={props.onClick}
          selectedFilter={props.selectedFilter}
          icon={StaffPfc}
          title="Staff Performance"
        />
        <Row
          className="ant-row-middle ant-row-space-between"
          style={{ marginTop: "10px" }}
        >
          <div
            className="overviewParent"
            ref={scrollRef}
            style={{
              width: "100%",
              height: "200px",
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
            {appointmentData?.length == 0 ? (
              <div className="graph-container">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Data Available"
                />
              </div>
            ) : (
              <div
                className="graph-container"
                style={{
                  width: `${appointmentData?.length * 130}px`,
                  minWidth: "100%",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {/* <LineChart width={200} height={200} data={appointmentData}>
                      <Line type="monotone" dataKey="doctor" stroke="#E83151" />
                      <XAxis dataKey="name" />
                      <Tooltip />
                    </LineChart> */}
                  <BarChart data={appointmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="doctorName"
                      tick={{ fontSize: 12 }}
                      interval={0}
                    />
                    {/* <YAxis /> */}
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      stackId="a"
                      fill="#2B5A6E"
                      name="Count"
                      barSize={25}
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </Row>
      </Card>
    </Col>
  );
};
