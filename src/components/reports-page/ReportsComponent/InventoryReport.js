import React, { useEffect, useState, useRef } from "react";
import { Card, Col, Row, Empty } from "antd";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { InventoryCardIcon } from "../../util/SvgUtil";
import { CardHeader } from "./CommonComponent/CardHeader";
import ReportServices from "../../../services/ReportServices";
import { localToUtc } from "../../util/TimeUtil";

export const InventoryReport = (props) => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [data, setData] = useState([]);
  const [cardFilters, setCardFilters] = useState();

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      const filter = props.selectedFilter.toLowerCase();
      if (filter === "yearly") {
        ReportServices.invRetrive(
          filter,
          props.cardFilters,
          0,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              setData(data.inventoryData);
            }
          },
        );
      } else if (filter === "monthly") {
        ReportServices.invRetrive(
          filter,
          new Date().getFullYear(),
          props.cardFilters,
          0,
          null,
          null,
          (data) => {
            if (isMounted) {
              setData(data.inventoryData);
            }
          },
        );
      } else if (filter === "weekly") {
        ReportServices.invRetrive(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          null,
          null,
          (data) => {
            if (isMounted) {
              setData(data.inventoryData);
            }
          },
        );
      } else if (filter === "custom") {
        ReportServices.invRetrive(
          filter,
          new Date().getFullYear(),
          new Date().getMonth(),
          props.cardFilters,
          localToUtc(props?.dates?.startDate).format("YYYY-MM-DD"),
          localToUtc(props?.dates?.endDate).format("YYYY-MM-DD"),
          (data) => {
            if (isMounted) {
              setData(data.inventoryData);
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

  // const data = [
  //   { category: "Vaccine", cost: 20, margin: 15, price: 35 },
  //   { category: "Parasiticide", cost: 25, margin: 10, price: 35 },
  //   { category: "Antibiotic", cost: 18, margin: 12, price: 30 },
  //   { category: "Medication", cost: 22, margin: 13, price: 35 },
  // ];

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
    <Col sm={24} xl={12} xxl={6}>
      <Card
        bordered={false}
        style={{ borderRadius: "16px" }}
        className="dash-card"
      >
        <CardHeader
          onClick={props.onClick}
          onFilterChange={(value) => handleFilterChange(value)}
          selectedFilter={props.selectedFilter}
          icon={InventoryCardIcon}
          title="Inventory"
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
              height: "220px",
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
            {data?.length == 0 ? (
              <div className="graph-container">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Data Available"
                />
              </div>
            ) : (
              <div
                className="graph-container"
                style={{ width: `${data?.length * 120}px`, minWidth: "100%" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }} // Adjust font size for better visibility
                      interval={0} // Show all labels
                      //angle={-45} // Rotate labels to avoid overlap
                      //textAnchor="end"
                    />
                    <Legend />
                    <Tooltip
                      formatter={(value, name) => [
                        `$${value.toFixed(2)}`,
                        name,
                      ]}
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
        </Row>
      </Card>
    </Col>
  );
};
