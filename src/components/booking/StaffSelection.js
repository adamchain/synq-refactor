import React, { useState, useEffect } from "react";
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
import CustomImage from "../generic-components/custom-image/CustomImage";
import StaffServices from "../../services/StaffServices";

const { Title, Text } = Typography;

const customImageStyling = (fullname, image) => {
  return {
    width: "60px",
    height: "60px",
    showInfoIcon: false,
    showOuterBorder: true,
    url: image ? `url(` + image + `)` : "",
    fullName: fullname, // pass dynamic full name
  };
};
export const RenderStaffSelection = (props) => {
  const {
    formData,
    handleInputChange,
    isRegistered,
    staffInitialData,
    setStaffInitialData,
    staffSelectionRef,
  } = props;
  const dayOrder = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 7 };

  useEffect(() => {
    fetchAllStaffs();
  }, [formData.selectedServices]);

  const sortedData = (data) => {
    return data.map((person) => ({
      ...person,
      workingDays: person.workingDays
        ? person.workingDays
            .map((day) => day.toUpperCase())
            .sort((a, b) => (dayOrder[a] || 8) - (dayOrder[b] || 8)) // Sort days
        : [], // Default to an empty array if no workingDays
    }));
  };

  const fetchAllStaffs = () => {
    StaffServices.fetchStaffWithService(
      formData.branchId,
      formData.orgId,
      formData?.selectedServices[0]?.inventoryId,
      (data) => {
        const staffdata = sortedData(data); // Properly sorted data
        setStaffInitialData(staffdata);
        setTimeout(() => {
          if (staffSelectionRef.current)
            formData.selectedStylist != null &&
              staffSelectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
        }, 1500); // Add a small delay to allow re-render
      },
    );
  };
  return (
    <Card
      className="stylist-selection"
      style={{
        marginBottom: "24px",
        opacity: formData?.selectedServices[0]?.inventoryId ? 1 : 0.5,
      }}
    >
      <Title level={4} style={{ fontWeight: 600, marginBottom: "0.5em" }}>
        Choose Your Stylist
      </Title>
      <Row gutter={[16, 16]}>
        {!staffInitialData?.length > 0 && (
          <Col>
            <Text type="secondary">
              No stylist is available for the selected service!
            </Text>
          </Col>
        )}
        {Array.from(staffInitialData).map((stylist, index) => (
          <Col span={12} key={stylist.userId}>
            <Card
              hoverable={!!formData.selectedServices}
              className={`stylist-card ${formData.selectedStylist?.id === stylist.userId ? "selected" : ""}`}
              onClick={() => {
                isRegistered &&
                  handleInputChange("selectedStylist", stylist.userId);
              }}
              style={{
                height: "100%",
                borderRadius: "12px",
                backgroundColor:
                  formData.selectedStylist === stylist.userId
                    ? "rgb(238 242 255)"
                    : "#fff",
                borderColor:
                  formData.selectedStylist === stylist.userId
                    ? "#6366f1"
                    : "#e5e7eb",
                cursor: !!formData?.selectedServices[0]?.inventoryId
                  ? "pointer"
                  : "not-allowed",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  columnGap: 15,
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <CustomImage
                  styling={customImageStyling(
                    stylist.firstName + " " + stylist.lastName,
                    stylist?.image,
                  )}
                ></CustomImage>
                <div>
                  <Title level={5} style={{ margin: 0 }}>
                    {stylist.firstName + " " + stylist.lastName}
                  </Title>
                  <Text type="secondary">{stylist?.title}</Text>
                </div>
              </div>
              <div>
                <Text
                  type="secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <ScissorOutlined style={{ marginRight: "8px" }} /> Working
                  Days
                </Text>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {stylist?.workingDays?.map((specialty) => (
                    <Tag
                      key={specialty}
                      style={{ borderRadius: "16px", padding: "4px 12px" }}
                    >
                      {specialty}
                    </Tag>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
