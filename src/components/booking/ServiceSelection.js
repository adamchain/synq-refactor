import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  Checkbox,
  Tag,
  Avatar,
  message,
} from "antd";
import {
  ClockCircleOutlined,
  DollarOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import "./Booking.scss";
import InventoryServices from "../../services/InventoryServices";
import { CalendarIcon } from "../util/SvgUtil";

const { Title, Text } = Typography;

export const RenderServiceSelection = (props) => {
  const { branchId, orgId, formData, setFormData } = props;
  const [procedures, setProcedures] = useState([]);
  const getInventory = () => {
    InventoryServices.getServiceInventory(branchId, orgId, (data) =>
      setProcedures(data),
    );
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <Card className="service-selection" style={{ marginBottom: "24px" }}>
      <Row align="middle" style={{ marginBottom: "1.5em" }}>
        <CalendarIcon
          style={{ margin: "0 1em 1em 0", height: "22px" }}
          fillcolor="#6366f1"
        />
        <Title level={3}>Book Your Appointment</Title>
      </Row>
      <Title level={4} style={{ fontWeight: 600, marginBottom: "0.5em" }}>
        Select a Service
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {procedures.map((service) => (
          <Card
            key={service.inventoryId}
            className={`service-card ${formData.selectedServices.includes(service) ? "selected" : ""}`}
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                selectedServices: prev.selectedServices.includes(service)
                  ? prev.selectedServices.filter(
                      (s) => s.inventoryId !== service.inventoryId,
                    )
                  : [service],
                selectedStylist: "",
              }));
            }}
            style={{
              borderRadius: "12px",
              borderColor: formData?.selectedServices?.includes(service)
                ? "#6366f1"
                : "#e5e7eb",
              //cursor: formData.selectedStylist ? 'pointer' : 'not-allowed'
              backgroundColor: formData?.selectedServices.includes(service)
                ? "rgb(238 242 255)"
                : "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <Title level={5} style={{ margin: 0 }}>
                  {service?.productName}
                </Title>
                <Text
                  type="secondary"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  {service?.description}
                </Text>

                <div style={{ display: "flex", gap: "16px" }}>
                  {service.showduration && (
                    <Text type="secondary">
                      <ClockCircleOutlined style={{ marginRight: "4px" }} />
                      {service?.duration} min
                    </Text>
                  )}
                  {service.showprice && (
                    <Text type="secondary">
                      <DollarOutlined style={{ marginRight: "4px" }} />$
                      {service?.maxPrice}
                    </Text>
                  )}
                </div>
              </div>
              <Tag color="blue">{service?.name}</Tag>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
