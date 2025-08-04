import {
  Button,
  Card,
  message,
  Checkbox,
  Col,
  Row,
  Select,
  Space,
  Typography,
  Input,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import CommonUtil from "../util/CommonUtil.js";
import { PlusCircleFilled } from "@ant-design/icons";
import AppointmentServices from "./../../services/AppointmentServices";
import "./AppointmentModal.scss";
import config from "../../config";

const apptlength = [
  { name: "15 MIN", value: 15 },
  { name: "30 MIN", value: 30 },
  { name: "45 MIN", value: 45 },
  { name: "1 HR", value: 60 },
  { name: "1.5 HR", value: 90 },
  { name: "2 HR", value: 120 },
];
const { Text } = Typography;
const { Option } = Select;
const CreateApptStep1 = ({
  refetchPatientDetails,
  appointmentData,
  setAppointmentData,
  patientDetails,
  updatePrimaryDoctor,
}) => {
  const context = useContext(CommonContext);
  //let appttype = Object.values(context.defaultBranch.branchTypeId === 2 ? CommonUtil.APPOINTMEN_TYPES_BRANCH_TYPE_2 : CommonUtil.APPOINTMEN_TYPES);
  let patientId, clientId;
  const [showCreateFields, setShowCreateFields] = useState(false);
  const [newPatient, setNewPatient] = useState({
    clientName: "",
    email: "",
    patientName: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [appttype1, setAppttype1] = useState([]);
  const [appttype, setAppttype] = useState([]);

  //for dynamic appt types
  useEffect(() => {
    const fetchAptType = () => {
      AppointmentServices.fetchApptTypes((data) => setAppttype1(data));
    };
    fetchAptType();
  }, []);

  useEffect(() => {
    if (appttype1.length > 0) {
      const transformedApptType = transformApptType(appttype1);
      setAppttype(transformedApptType);
    }
  }, [appttype1]);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const transformApptType = (appttypeArray) => {
    const map = Object.values(
      context?.defaultBranch?.branchTypeId === 2
        ? CommonUtil.APPOINTMEN_TYPES_BRANCH_TYPE_2
        : CommonUtil.APPOINTMEN_TYPES,
    );

    return appttypeArray.map((item) => {
      const match = map.find(
        (type) =>
          type.name.toUpperCase().trim() ===
          item.apptTypeName.toUpperCase().trim(),
      );

      return {
        name: item.apptTypeName,
        value: item.apptTypeId,
        presetTime: item.apptLength,
        color: match?.color || "#D7D7D7",
        isDropOff: match?.isDropOff || false,
      };
    });
  };

  const handleCreateClick = () => {
    setShowCreateFields(!showCreateFields); // Toggle input fields
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(!emailPattern.test(value));
    }
    setNewPatient((prev) => {
      if (name == "clientName") {
        return { ...prev, [name]: value, ["patientName"]: value };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleCreatePatient = () => {
    // Handle the logic to create a new patient (e.g., API call)
    console.log("Creating new patient:", newPatient);
    if (
      newPatient.clientName == "" ||
      newPatient.patientName == "" ||
      newPatient.email == "" ||
      emailError
    ) {
      message.warn("Please add the complete details in correct format!");
    } else {
      AppointmentServices.createClientPatient(newPatient)
        .then((response) => {
          //console.log("Client and patient created successfully:", response);
          patientId = response.patientId;
          clientId = response.clientId;

          // Handle success of createClientPatient, e.g., update UI or state
          refetchPatientDetails();
          setAppointmentData((k) => ({ ...k, patientId: response.patientId }));

          // Call the next API: createClientRegister
          return AppointmentServices.createClientRegister(newPatient);
        })
        .then((registerResponse) => {
          //console.log("Client registration successful:", registerResponse);
          const jwtPayload = {
            email: newPatient.email,
            patientId: patientId,
            clientId: clientId,
            url: `${config.base_url}/client-intake`,
          };
          // Call the third API: createJWTtoken after createClientRegister succeeds
          return AppointmentServices.createJWTtoken(jwtPayload);
        })
        .then((jwtResponse) => {
          console.log("Patient added successfully", jwtResponse);

          // Handle final success or update UI/state as needed
        })
        .catch((error) => {
          console.error("Failed to complete the process:", error);
          // Handle error for any of the API calls
        })
        .finally(() => {
          // Reset fields and hide form after submission, regardless of success or error
          setShowCreateFields(false);
          setNewPatient({ clientName: "", email: "", patientName: "" });
        });
    }
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card bordered={false} className="appt-card">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Space size={8} direction="vertical" style={{ width: "100%" }}>
                  <Row justify="space-between" align="middle">
                    <Text>
                      {context.defaultBranch.branchTypeId !== 2
                        ? "Patient Name"
                        : "Client Name"}
                    </Text>
                    {/* <PlusCircleFilled
                          onClick={handleCreateClick}
                          style={{ fontSize: "16px", cursor: "pointer" }}
                        /> */}
                  </Row>
                  <Select
                    size="large"
                    showSearch={true}
                    value={appointmentData.patientId}
                    // filterOption={(input, option) =>
                    //     option.children??"".toLowerCase().indexOf(input.children?.toLowerCase()) >= 0
                    // }
                    filterOption={(input, option) =>
                      option.extra.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    // filterSort={(optionA, optionB) =>
                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    //  }
                    onChange={(value) => {
                      setAppointmentData((k) => ({ ...k, patientId: value }));
                      updatePrimaryDoctor(value);
                    }}
                    placeholder={
                      <Text>
                        {context.defaultBranch.branchTypeId !== 2
                          ? "Select a Patient Name"
                          : "Select client name"}
                      </Text>
                    }
                    style={{ width: "100%", marginBottom: "24px" }}
                  >
                    {patientDetails.map((k) => (
                      <Option key={k.id} value={k.id} extra={k.name}>
                        <Row>
                          <Col style={{ fontWeight: 500 }}>
                            {k.name} {k.lastName}
                          </Col>
                        </Row>
                        {/* <Row>
                              <Col className="font-size-12">{k.breed}</Col>
                            </Row> */}
                      </Option>
                    ))}
                  </Select>
                  {showCreateFields && (
                    <>
                      <Input
                        placeholder="Client First Name*"
                        name="clientName"
                        value={newPatient.clientName}
                        onChange={handleInputChange}
                        style={{ marginBottom: "8px" }}
                      />
                      <Input
                        placeholder="Client Email*"
                        name="email"
                        value={newPatient.email}
                        onChange={handleInputChange}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // email pattern
                        style={{
                          marginBottom: "8px",
                          borderColor: emailError ? "red" : undefined, // show red border if invalid
                        }}
                      />
                      {emailError && (
                        <span style={{ color: "red" }}>
                          Invalid email format
                        </span>
                      )}

                      {/* <Input
                            className='hider'
                            placeholder="Patient Name*"
                            name="patientName"
                            value={newPatient.clientName}
                            onChange={handleInputChange}
                            style={{ marginBottom: "8px" }}
                          /> */}
                      <Button
                        type="primary"
                        style={{ marginBottom: "8px" }}
                        onClick={handleCreatePatient}
                      >
                        Create Patient
                      </Button>
                    </>
                  )}
                </Space>
              </Col>
            </Row>
            <Space size={8} direction="vertical" style={{ width: "100%" }}>
              <Text>Appointment Type</Text>

              <Row
                justify="space-evenly"
                style={{ marginBottom: "24px" }}
                gutter={[8, 8]}
              >
                {appttype.map((type) => {
                  // Ensure the color is valid
                  const buttonColor = type.color || "#d9d9d9";
                  const bgColor = buttonColor + "20"; // 20% opacity version

                  return (
                    <Col span={8} key={type.value}>
                      <Button
                        type="default"
                        style={{
                          backgroundColor: "#f8f8f8",
                          borderColor: buttonColor,
                          borderWidth: "1px",
                          color: "#012729",
                          fontWeight:
                            appointmentData.appointmentType === type.value
                              ? "600"
                              : "normal",
                          width: "100%",
                        }}
                        shape="round"
                        size="small"
                        value={type.value}
                        onClick={() => {
                          let updateObject = { appointmentType: type.value };
                          if (type.presetTime)
                            updateObject["appointmentLength"] = type.presetTime;
                          if (type.isDropOff)
                            updateObject["isDropOffAppointment"] = true;
                          setAppointmentData((k) => ({
                            ...k,
                            ...updateObject,
                          }));
                        }}
                        className="appt-button"
                      >
                        {type.name}
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </Space>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Text>Appointment Length</Text>

              <Row
                justify="start"
                gutter={[8, 8]}
                style={{ marginBottom: "24px" }}
              >
                {apptlength.map((apptlen) => (
                  <Col span={8}>
                    <Button
                      type={
                        appointmentData.appointmentLength === apptlen.value
                          ? "primary"
                          : "default"
                      }
                      shape="round"
                      size="small"
                      value={apptlen.value}
                      onClick={(event) => {
                        setAppointmentData((k) => ({
                          ...k,
                          appointmentLength: apptlen.value,
                        }));
                      }}
                      className={
                        appointmentData.appointmentLength === apptlen.value
                          ? "appt-button-color appt-time-button"
                          : "appt-time-button"
                      }
                    >
                      {apptlen.name}
                    </Button>{" "}
                  </Col>
                ))}
              </Row>
            </Space>

            <Checkbox
              className="hider"
              onChange={(value) => {
                setAppointmentData((k) => ({
                  ...k,
                  isDropOffAppointment: !appointmentData.isDropOffAppointment,
                }));
              }}
              checked={appointmentData.isDropOffAppointment}
            >
              Drop Off Appointment
            </Checkbox>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreateApptStep1;
