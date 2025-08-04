import React, { useState, useContext, useEffect } from "react";
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
  Space,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import { momentLocal } from "../util/TimeUtil";
import { CommonContext } from "../../context/CommonContext";
import CustomReactCalendar from "../generic-components/custom-react-calendar/CustomReactCalendar";
import AppointmentServices from "../../services/AppointmentServices";
import { BehaviorAlertIcon } from "../util/SvgUtil";
import moment from "moment";
import "./Booking.scss";

const { Title, Text } = Typography;

export const RenderSlotSelection = (props) => {
  const {
    formData,
    handleInputChange,
    setApptBooked,
    staffInitialData,
    slotSelectionRef,
    branchId,
    orgId,
  } = props;
  const [availtimes, setAvailTimes] = useState({});
  const [step1Data, setStep1Data] = useState({
    patientId: null,
    appointmentType: "",
    appointmentLength: "30",
    isDropOffAppointment: false,
    providerId: formData.selectedStylist,
    appointmentDate: momentLocal(),
    appointmentTime: "",
  });
  const context = useContext(CommonContext);
  const [chosenLastDate, setChoseLastDate] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const fetchAvailableTimes = (inputDate, isForce) => {
    let month = inputDate.month();
    let year = inputDate.year();

    if (isForce || !availtimes.hasOwnProperty(year + "-" + month)) {
      if (formData.selectedStylist) {
        let currentDate = inputDate.format("YYYY-MM-DD");
        let startDate = momentLocal([
          Number.parseInt(currentDate.split("-")[0]),
          Number.parseInt(currentDate.split("-")[1]) - 1,
        ]);
        let endDate = momentLocal(startDate).endOf("month");
        let timeRange = [
          startDate.format("YYYY-MM-DD"),
          endDate.format("YYYY-MM-DD"),
        ];
        setStep1Data((k) => ({ ...k, appointmentTime: "" }));
        AppointmentServices.fetchAllAvailableTimeForDRInMonth(
          formData.branchId,
          formData.orgId,
          formData.selectedStylist,
          step1Data.appointmentLength,
          timeRange,
          (data) => {
            let updatedData = Object.keys(data)
              .filter((k) => data[k].length > 0)
              .reduce((total, current) => {
                total[current] = data[current];
                return total;
              }, {});
            setAvailTimes((k) => ({
              ...k,
              [endDate.year() + "-" + endDate.month()]: updatedData,
            }));
            setTimeout(() => {
              if (slotSelectionRef.current) {
                slotSelectionRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }, 1500); // Add a small delay to allow re-render
          },
        );
      }
    }
  };

  useEffect(() => {
    fetchAvailableTimes(step1Data.appointmentDate, false);
  }, [step1Data.appointmentDate, formData]);

  useEffect(() => {
    setAvailTimes({});
    setTimeout(
      () =>
        fetchAvailableTimes(chosenLastDate || step1Data.appointmentDate, true),
      10,
    );
  }, [formData.selectedStylist]);

  let calendarDate = step1Data.appointmentDate.toDate();
  let availTimeKey = calendarDate.getFullYear() + "-" + calendarDate.getMonth();

  const checkForConflicts = async (newStart, newEnd) => {
    try {
      const dateStr = step1Data.appointmentDate.format("YYYY-MM-DD");
      const existingAppts = await AppointmentServices.getAppointmentsForDate(
        branchId,
        orgId,
        formData.selectedStylist,
        dateStr,
      );

      for (const appt of existingAppts) {
        const existingStart = new Date(appt.stTime);
        const existingEnd = new Date(
          existingStart.getTime() + appt.duration * 60000,
        );
        if (newStart < existingEnd && newEnd > existingStart) {
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("Error checking for appointment conflicts:", err);
      return true; // Fail-safe
    }
  };

  const handleBookAppointment = async () => {
    const startDateTime = new Date(
      getFormattedTime(step1Data.appointmentDate, step1Data.appointmentTime),
    );
    const duration = formData?.selectedServices[0]?.duration || 30;
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    const hasConflict = await checkForConflicts(startDateTime, endDateTime);
    if (hasConflict) {
      message.error(
        "This time overlaps with another appointment. Please select a different time.",
      );
      return;
    }

    let inputJson = {
      patientId: formData.patientId,
      providerId: formData.selectedStylist,
      apptTypeId: formData?.selectedServices[0]?.apptTypeId,
      stTime: startDateTime.toISOString().slice(0, 16),
      duration: duration,
      dropOff: formData.isDropOffAppointment ? "true" : "false",
      notes: formData.notes,
      apptStatusId: 1,
      branchId: branchId,
      orgId: orgId,
    };

    AppointmentServices.createAppointment(inputJson, onSuccessReturn);
  };

  const onSuccessReturn = (success) => {
    //message.success('Appointment booked successfully!');
    console.log("formData--", formData);
    if (success) {
      setApptBooked(true);
    } else {
      message.error("Booking Failed!");
    }
  };
  const onCalendarViewChange = (startDate) => {
    fetchAvailableTimes(startDate, false);
  };
  function getFormattedTime(appointmentDate, appointmentTime) {
    try {
      // Ensure `appointmentDate` is a valid Date object or Moment object
      const isMomentDate = moment.isMoment(appointmentDate);
      const parsedDate = isMomentDate
        ? appointmentDate.toDate()
        : new Date(appointmentDate);

      // Safari-specific handling
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid Date provided");
      }

      // Ensure `appointmentTime` is properly formatted
      const timeParts = appointmentTime.split(/[: ]/);
      const isPM = appointmentTime.includes("PM");
      let hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      if (isPM && hours < 12) hours += 12; // Convert PM to 24-hour format
      if (!isPM && hours === 12) hours = 0; // Handle 12 AM edge case

      parsedDate.setHours(hours, minutes, 0, 0);

      // Return in the required format
      return parsedDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    } catch (error) {
      console.error("Date parsing failed:", error);
      return null; // Return null in case of failure
    }
  }
  return (
    <Card
      className="time-selection"
      style={{
        marginBottom: "24px",
        opacity: formData.selectedServices.length > 0 ? 1 : 0.5,
      }}
    >
      <Title level={4} style={{ fontWeight: 600, marginBottom: "0.5em" }}>
        Choose Appointment Date & Time
      </Title>
      <Card style={{ borderRadius: "12px" }}>
        <Row className="ant-row-middle" style={{ position: "relative" }}>
          <Text style={{ marginRight: 20 }}>Appointment Date</Text>{" "}
          <Button
            onClick={(e) => {
              e.preventDefault();
              setShowCalendar(true);
            }}
          >
            {moment(calendarDate).format("ddd DD, YYYY")}{" "}
            <CalendarOutlined style={{ marginLeft: "8px" }} />
          </Button>
          {showCalendar && (
            <CustomReactCalendar
              fullscreen={false}
              calendarType="US"
              showNeighboringMonth={false}
              onChange={(value) => {
                setStep1Data((k) => ({
                  ...k,
                  appointmentDate: momentLocal(value),
                }));
                setShowCalendar(false);
              }}
              onActiveStartDateChange={({
                action,
                activeStartDate,
                value,
                view,
              }) => {
                let tempDate = momentLocal(activeStartDate);
                onCalendarViewChange(tempDate);
                setChoseLastDate(tempDate);
              }}
              tileDisabled={({ activeStartDate, date, view }) => {
                let key = date.getFullYear() + "-" + date.getMonth();
                return !(
                  availtimes.hasOwnProperty(key) &&
                  availtimes[key].hasOwnProperty(date.getDate())
                );
              }}
              value={calendarDate}
            />
          )}
        </Row>

        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Divider style={{ padding: 0, marginTop: 16, marginBottom: 16 }} />
          <Text>Available Times</Text>

          <Row
            justify="space-between"
            gutter={[8, 8]}
            className="bookingAvailableTimes"
          >
            {availtimes.hasOwnProperty(availTimeKey) &&
            availtimes[availTimeKey].hasOwnProperty(calendarDate.getDate()) ? (
              Object.values(
                availtimes[availTimeKey][calendarDate.getDate()],
              ).map((avail) => (
                <Col span={8}>
                  <Button
                    type={
                      step1Data.appointmentTime === avail
                        ? "primary"
                        : "default"
                    }
                    shape="round"
                    value={avail}
                    disabled={!formData.selectedServices.length}
                    onClick={(event) => {
                      setStep1Data((k) => ({ ...k, appointmentTime: avail }));
                      formData.selectedServices.length > 0 &&
                        handleInputChange("selectedTimeSlot", avail);
                    }}
                    className={
                      step1Data.appointmentTime === avail
                        ? "primary-button-color appt-time-button"
                        : "appt-time-button"
                    }
                  >
                    {avail}
                  </Button>{" "}
                </Col>
              ))
            ) : (
              <Col span={24} className="no-available-time">
                <Row justify="center" align="middle">
                  <Col>
                    <BehaviorAlertIcon style={{ color: "#767676" }} />
                  </Col>
                </Row>
                <Row justify="center" align="middle">
                  <Col>
                    <Text type="secondary">No Time Available</Text>
                  </Col>
                </Row>
                {/* <Row justify="center" align="middle"><Col><a>Click to Find Next Available Time</a></Col></Row>*/}
              </Col>
            )}
          </Row>
        </Space>

        {/* <Row gutter={[16, 16]}>
              {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(time => (
                <Col span={8} key={time}>
                  <Button
                    type={formData.selectedTimeSlot === time ? 'primary' : 'default'}
                    onClick={() => formData.selectedServices.length > 0 && handleInputChange('selectedTimeSlot', time)}
                    disabled={!formData.selectedServices.length}
                    style={{
                      width: '100%',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: formData.selectedTimeSlot === time ? '#6366f1' : undefined,
                      cursor: formData.selectedServices.length > 0 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {time}
                  </Button>
                </Col>
              ))}
            </Row> */}
        {formData?.selectedServices[0]?.apptTypeId &&
          formData.selectedStylist &&
          staffInitialData.length > 0 &&
          step1Data.appointmentDate &&
          step1Data.appointmentTime && (
            <Row style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleBookAppointment}
                  style={{
                    width: "100%",
                    height: "48px",
                    backgroundColor: "#6366f1",
                    borderRadius: "8px",
                  }}
                >
                  Book Appointment
                </Button>
              </Col>
            </Row>
          )}
      </Card>
    </Card>
  );
};
