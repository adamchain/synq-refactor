import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Row,
  Button,
  Typography,
  Col,
  Space,
  Select,
  Divider,
} from "antd";
import "./AppointmentModal.scss";
import CustomReactCalendar from "../generic-components/custom-react-calendar/CustomReactCalendar";
import { BehaviorAlertIcon } from "../util/SvgUtil";
import AppointmentServices from "../../services/AppointmentServices";
import { momentLocal } from "../util/TimeUtil";
import { CommonContext } from "../../context/CommonContext";
//const availtimes = ["10:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "3:30 PM", "4:00 PM"];
const { Text } = Typography;
const { Option } = Select;

const CreateApptStep2 = ({
  appointmentData,
  setAppointmentData,
  doctorDetails,
  step1Data,
}) => {
  const [availtimes, setAvailTimes] = useState({});
  const [chosenLastDate, setChoseLastDate] = useState();
  //const availdates = [15 , 18 , 23];
  const commonContext = useContext(CommonContext);

  const fetchAvailableTimes = (inputDate, isForce) => {
    let month = inputDate.month();
    let year = inputDate.year();

    if (isForce || !availtimes.hasOwnProperty(year + "-" + month)) {
      if (appointmentData.providerId) {
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
        setAppointmentData((k) => ({ ...k, appointmentTime: "" }));
        AppointmentServices.fetchAllAvailableTimeForDRInMonth(
          commonContext?.defaultBranch?.branchId,
          commonContext?.defaultBranch?.orgId,
          appointmentData.providerId,
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
          },
        );
      }
    }
  };

  // useEffect (()=>{
  //     if(appointmentData.providerId  && appointmentData.appointmentDate  ){

  //         fetchAvailableTimes(appointmentData.appointmentDate);
  //         //AppointmentServices.fetchAllAvailableTimeForDR(appointmentData.providerId,appointmentData.appointmentDate.format("YYYY-MM-DD"),step1Data.appointmentLength,setAvailTimes);
  //     }
  //     fetchAvailableTimes(momentLocal());

  // },[appointmentData.providerId , appointmentData.appointmentDate]);

  useEffect(() => {
    fetchAvailableTimes(appointmentData.appointmentDate, false);
  }, [appointmentData.appointmentDate]);

  useEffect(() => {
    setAvailTimes({});
    setTimeout(
      () =>
        fetchAvailableTimes(
          chosenLastDate || appointmentData.appointmentDate,
          true,
        ),
      10,
    );
  }, [appointmentData.providerId]);

  const onCalendarViewChange = (startDate) => {
    fetchAvailableTimes(startDate, false);
  };

  let calendarDate = appointmentData.appointmentDate.toDate();
  let availTimeKey = calendarDate.getFullYear() + "-" + calendarDate.getMonth();
  return (
    <div className="site-card-border-less-wrapper" id="innerCalendar">
      <Card bordered={false} className="appt-card">
        <Row>
          <Col span={24}>
            <Row style={{ marginBottom: "16px" }}>
              <Col span={24}>
                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                  <Text>Provider </Text>

                  <Select
                    size="large"
                    showSearch={true}
                    value={appointmentData.providerId}
                    filterOption={(input, option) =>
                      option.extra.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    // filterOption={(input, option) =>
                    //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    // filterSort={(optionA, optionB) =>
                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    //  }
                    onChange={(value) =>
                      setAppointmentData((k) => ({ ...k, providerId: value }))
                    }
                    placeholder={<Text>Select a Provider</Text>}
                    style={{ width: "100%" }}
                  >
                    {doctorDetails.map((k) => (
                      <Option extra={k.fullName} value={k.userId}>
                        {k.fullName}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="bookingModalCalendar">
                {/* tileDisabled={({activeStartDate, date, view }) => !availdates.includes (date.getDate())} */}
                <CustomReactCalendar
                  fullscreen={false}
                  calendarType="US"
                  showNeighboringMonth={false}
                  onChange={(value) => {
                    setAppointmentData((k) => ({
                      ...k,
                      appointmentDate: momentLocal(value),
                    }));
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

                {/* <Calendar value={appointmentData.appointmentDate} onChange={(value) => setAppointmentData(k => ({ ...k, appointmentDate: value }))} fullscreen={false} /> */}
                {/* <DatePicker /> */}
              </Col>
            </Row>

            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Divider
                style={{ padding: 0, marginTop: 16, marginBottom: 16 }}
              />
              <Text>Available Times</Text>

              <Row
                justify="space-between"
                gutter={[8, 8]}
                className="bookingAvailableTimes"
              >
                {availtimes.hasOwnProperty(availTimeKey) &&
                availtimes[availTimeKey].hasOwnProperty(
                  calendarDate.getDate(),
                ) ? (
                  Object.values(
                    availtimes[availTimeKey][calendarDate.getDate()],
                  ).map((avail) => (
                    <Col span={8}>
                      <Button
                        type={
                          appointmentData.appointmentTime === avail
                            ? "primary"
                            : "default"
                        }
                        shape="round"
                        value={avail}
                        onClick={(event) => {
                          setAppointmentData((k) => ({
                            ...k,
                            appointmentTime: avail,
                          }));
                        }}
                        className={
                          appointmentData.appointmentTime === avail
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
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreateApptStep2;
