import React, { useState, useCallback, useRef } from "react";
import { Row, Col, Card, Typography, Input, Button, message } from "antd";
import "./Booking.scss";
import { RenderServiceSelection } from "./ServiceSelection";
import { RenderStaffSelection } from "./StaffSelection";
import { RenderSlotSelection } from "./SlotSelection";
import ClientServices from "../../services/ClientServices";

const { Title } = Typography;

export default function BookingForm() {
  const staffSelectionRef = useRef(null);
  const slotSelectionRef = useRef(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [apptBooked, setApptBooked] = useState(false);
  const [staffInitialData, setStaffInitialData] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const branchId = urlParams.get("branchId");
  const orgId = urlParams.get("orgId");
  const businessNameFromUrl = urlParams.get("businessName");
  const [businessTitle] = useState(businessNameFromUrl || "Our Business");

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    branchId: branchId,
    orgId: orgId,
    apptStatusId: 1,
    apptTypeId: "",
    duration: 30,
    patientId: "",
    notes: "",
    dropOff: "true",
    promotionalConsent: false,
    selectedStylist: null,
    selectedServices: [],
    selectedTimeSlot: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loginUser = useCallback(async (userData) => {
    try {
      const result = await new Promise((resolve) =>
        ClientServices.loginClient(userData, resolve),
      );
      console.log("Login result:", result);
      setFormData((prev) => ({ ...prev, patientId: result[0]?.patientId }));
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }, []);

  const registerUser = useCallback(async (userData) => {
    try {
      const result = await new Promise((resolve) =>
        ClientServices.registerNewClient(userData, resolve),
      );
      console.log("Registration result:", result);
      return result !== null;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  }, []);

  const createClientAsPatient = useCallback(async (clientData) => {
    try {
      const res = await ClientServices.createClientAsPatientBooking(
        clientData,
        () => {},
        null,
      ); // Pass empty callback & null for `updateStateFields` if unused

      if (res) {
        setFormData((prev) => ({ ...prev, patientId: res?.patientId }));
        setIsRegistered(true);
        //message.success("Registration and login successful!");
        return true;
      }
      throw new Error("Failed to create client as patient");
    } catch (error) {
      console.error("Create client as patient error:", error);
      return false;
    }
  }, []);

  const handleRegistration = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // Validates US phone numbers

    // Validate required fields
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      message.error("Please fill in all required fields");
      return;
    }

    // Validate email format
    if (!emailRegex.test(formData.email)) {
      message.error("Please enter a valid email address");
      return;
    }

    // Validate phone format
    if (!phoneRegex.test(formData.phone)) {
      message.error(
        "Please enter a valid US phone number (e.g., 123-456-7890)",
      );
      return;
    }

    try {
      // First, try to login
      const initialLoginSuccess = await loginUser(formData);
      if (initialLoginSuccess[0]?.patientId) {
        setIsRegistered(true);
        console.log("initialLoginSuccess", initialLoginSuccess);
        message.success("Login successful!");
        return;
      }

      // If login fails, try to register
      const registrationSuccess = await registerUser(formData);
      if (!registrationSuccess) {
        // throw new Error("User already exist in another branch!")
      }

      // After successful registration, login again to create session
      const postRegistrationLoginSuccess = await loginUser(formData);
      if (!postRegistrationLoginSuccess) {
        throw new Error("Login after registration failed");
      }

      // Create client as patient to get patientId
      const createClientSuccess = await createClientAsPatient({
        primary: {
          firstName: formData.name,
          lastName: formData.lastName,
          email: formData.email,
        },
        phones: [
          {
            type: "PH",
            nbr: formData.phone,
            preferred: false,
          },
        ],
        allowEmail: true,
        allowText: true,
        optInReminder: true,
        branchId: branchId,
        orgId: orgId,
      });
    } catch (error) {
      console.error("Registration process error:", error);
      message.error(
        error.message || "An error occurred during the registration process",
      );
    }
  };

  const renderRegistrationForm = () => (
    <Card className="registration-form" style={{ marginBottom: "24px" }}>
      <Title level={3} style={{ marginBottom: "25px" }}>
        Welcome! Complete the following to book your appointment
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Input
            placeholder="First Name*"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={isRegistered}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Last Name*"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            disabled={isRegistered}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Email*"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={isRegistered}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Phone* (000-000-0000)"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={isRegistered}
          />
        </Col>
        {/* <Col span={24}>
          <Checkbox
            checked={formData.promotionalConsent}
            onChange={(e) => handleInputChange("promotionalConsent", e.target.checked)}
            disabled={isRegistered}
          >
            I agree to receive promotional emails and text messages about upcoming deals and services.
          </Checkbox>
        </Col> */}
        {!isRegistered && (
          <Col span={24}>
            <Button
              type="primary"
              htmlType="button"
              size="small"
              onClick={handleRegistration}
              style={{
                height: "48px",
                borderRadius: "8px",
                backgroundColor: "#6366f1",
              }}
            >
              Continue to Booking
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  );

  return (
    <div
      className="clientBooking"
      style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* 👇 NEW: Business name header */}
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Welcome to {businessTitle}
      </Title>

      {!apptBooked && !isRegistered && renderRegistrationForm()}
      <div id="serviceSelection">
        {!apptBooked && isRegistered && (
          <RenderServiceSelection
            branchId={branchId}
            orgId={orgId}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
      <div id="staffSelection" ref={staffSelectionRef}>
        {!apptBooked && isRegistered && (
          <RenderStaffSelection
            staffSelectionRef={staffSelectionRef}
            staffInitialData={staffInitialData}
            setStaffInitialData={setStaffInitialData}
            formData={formData}
            isRegistered={isRegistered}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
      <div id="slotSelection" ref={slotSelectionRef}>
        {!apptBooked && staffInitialData?.length > 0 && isRegistered && (
          <RenderSlotSelection
            branchId={branchId}
            orgId={orgId}
            slotSelectionRef={slotSelectionRef}
            staffInitialData={staffInitialData}
            setApptBooked={setApptBooked}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
      {apptBooked && (
        <Card
          className="registration-form"
          style={{ marginBottom: "24px", textAlign: "center" }}
        >
          <Title level={3}>Appointment booked!</Title>
        </Card>
      )}
    </div>
  );
}
