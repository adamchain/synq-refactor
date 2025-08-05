import React from "react";
import {
  Card,
  Row,
  Button,
  DatePicker,
  Typography,
  Col,
  Space,
  Select,
  Checkbox,
  Input,
  TimePicker,
} from "antd";
import "./AppointmentModal.scss";
import CustomReactCalendar from "../generic-components/custom-react-calendar/CustomReactCalendar";
import { momentLocal } from "../util/TimeUtil";
const { Text } = Typography;
const { Option } = Select;

const availtimes = [
  "No Repeat",
  "Daily",
  "Weekly",
  "Monthly",
  "90 Days",
  "Yearly",
];
const availdays = [
  { name: "S", value: 0 },
  { name: "M", value: 1 },
  { name: "T", value: 2 },
  { name: "W", value: 3 },
  { name: "T", value: 4 },
  { name: "F", value: 5 },
  { name: "S", value: 6 },
];

const BlockOffStep1 = ({
  appointmentData,
  setAppointmentData,
  staffDetails,
  updatePrimaryDoctor,
}) => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card bordered={false} className="appt-card">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Space size={8} direction="vertical" style={{ width: "100%" }}>
                  <Text>Staff Member</Text>
                  <Select
                    showSearch={true}
                    value={appointmentData.staffId}
                    filterOption={(input, option) =>
                      option.extra.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    onChange={(value) => {
                      setAppointmentData((k) => ({ ...k, staffId: value }));
                      updatePrimaryDoctor(value);
                    }}
                    placeholder={<Text>Select a Patient Name</Text>}
                    style={{ width: "100%", marginBottom: "24px" }}
                  >
                    {staffDetails.map((k) => (
                      <Option key={k.id} value={k.id} extra={k.name}>
                        <Row>
                          <Col>{k.name}</Col>
                        </Row>
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Col>
            </Row>
            <Space
              size={8}
              direction="vertical"
              style={{ width: "100%", marginBottom: "24px" }}
            >
              <Text>Block Off Reason</Text>
              <Input />
            </Space>
            <Row style={{ marginBottom: "24px" }}>
              <Col span={24} className="bookingModalCalendar">
                <CustomReactCalendar
                  fullscreen={false}
                  calendarType="US"
                  onChange={(value) => {
                    setAppointmentData((k) => ({
                      ...k,
                      blockOffDate: momentLocal(value),
                    }));
                    console.log("tje val ==>", momentLocal(value));
                  }}
                  value={appointmentData.blockOffDate.toDate()}
                />

                {/* <Calendar value={appointmentData.appointmentDate} onChange={(value) => setAppointmentData(k => ({ ...k, appointmentDate: value }))} fullscreen={false} /> */}
                {/* <DatePicker /> */}
              </Col>
            </Row>
            <Space
              size={8}
              direction="vertical"
              style={{ width: "100%", marginBottom: "24px" }}
            >
              <Text>Time Range</Text>
              <Row gutter={[8, 0]} align="middle">
                <Col span={15}>
                  <TimePicker.RangePicker style={{ width: "100%" }} />{" "}
                </Col>
                <Col span={9}>
                  <Checkbox>All Day Event</Checkbox>
                </Col>
              </Row>
            </Space>
            <Space direction="vertical" size="middle">
              <Text>Does this Event Repeat</Text>
              <Row justify="space-between" gutter={[24, 8]}>
                {availtimes.map((avail) => (
                  <Col span={7}>
                    <Button
                      type={
                        appointmentData.repeatType === avail
                          ? "primary"
                          : "default"
                      }
                      shape="round"
                      value={avail}
                      onClick={(event) => {
                        setAppointmentData((k) => ({
                          ...k,
                          repeatType: avail,
                        }));
                      }}
                      className={
                        appointmentData.repeatType === avail
                          ? "primary-button-color appt-button"
                          : "appt-button"
                      }
                    >
                      {avail}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Space>
            {appointmentData.repeatType === "Weekly" && (
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Text>Recurrence Days</Text>
                <Row justify="space-between" gutter={[20, 4]}>
                  {availdays.map((day) => (
                    <Col>
                      <Button
                        value={day.value}
                        type={
                          appointmentData.repeatDays.includes(day.value)
                            ? "primary"
                            : "default"
                        }
                        shape="circle"
                        onClick={() => {
                          let tempRepeatDays = [
                            ...{ ...appointmentData }["repeatDays"],
                          ];
                          if (tempRepeatDays.includes(day.value)) {
                            tempRepeatDays.splice(
                              tempRepeatDays.indexOf(day.value),
                              1,
                            );
                          } else {
                            tempRepeatDays.push(day.value);
                          }
                          setAppointmentData((k) => ({
                            ...k,
                            repeatDays: tempRepeatDays,
                          }));
                        }}
                        className="appt-button"
                      >
                        {" "}
                        {day.name}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Space>
            )}
            {appointmentData.repeatType !== "No Repeat" && (
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Text>Ending On</Text>
                <DatePicker
                  value={appointmentData.endDate}
                  onChange={(value) =>
                    setAppointmentData((k) => ({ ...k, endDate: value }))
                  }
                  style={{ width: "100%" }}
                />
              </Space>
            )}{" "}
            *
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BlockOffStep1;
