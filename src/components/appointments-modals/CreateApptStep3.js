import React from "react";
import { Card, Row, Typography, Col, Input, Space } from "antd";
import "./AppointmentModal.scss";

// const availtimes = ["No Repeat", "Daily", "Weekly", "Monthly", "90 Days", "Yearly"]
// const availdays = [{ name: "S", value: 0 }, { name: "M", value: 1 }, { name: "T", value: 2 }, { name: "W", value: 3 }, { name: "T", value: 4 }, { name: "F", value: 5 }, { name: "S", value: 6 }]
const { Text } = Typography;
const { TextArea } = Input;

//(e)=>setAppointmentData(k => ({ ...k, "notes": e.target.value}))
const CreateApptStep3 = ({ appointmentData, setAppointmentData }) => {
  const onChangeValue = (e) => {
    e.preventDefault();

    let val = e.target.value;
    setAppointmentData((k) => ({ ...k, notes: val }));
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card bordered={false} className="appt-card">
        <Row>
          <Col span={24}>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Text>Reason for Visit</Text>
              <TextArea
                value={appointmentData.notes}
                onChange={onChangeValue}
                rows={5}
                placeholder="Add notes or details here"
              />

              {/* <Space direction="vertical" size="middle">
                        <Text>Does this Event Repeat</Text>
                        <Row justify="space-between" gutter={[24, 8]}>
                            {
                                availtimes.map(avail => <Col span={7}>
                                    <Button
                                        type={appointmentData.repeatType === avail ? "primary" : "default"}
                                        shape="round"
                                        value={avail}
                                        onClick={(event) => {
                                            setAppointmentData(k => ({ ...k, "repeatType": avail }))
                                        }
                                        }
                                        className={appointmentData.repeatType === avail ? "primary-button-color appt-button" : "appt-button"}>
                                        {avail}</Button>
                                </Col>)
                            }
                        </Row></Space>
                    {appointmentData.repeatType === "Weekly" &&
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Text>Recurrence Days</Text>
                            <Row justify="space-between" gutter={[20, 4]}>
                                {
                                    availdays.map(day => <Col ><Button
                                        value={day.value}
                                        type={appointmentData.repeatDays.includes(day.value) ? "primary" : "default"}
                                        shape="circle"
                                        onClick={() => {
                                            let tempRepeatDays = [...{ ...appointmentData }["repeatDays"]];
                                            if (tempRepeatDays.includes(day.value)) {
                                                tempRepeatDays.splice(tempRepeatDays.indexOf(day.value), 1)
                                            } else {
                                                tempRepeatDays.push(day.value);
                                            }
                                            setAppointmentData(k => ({ ...k, repeatDays: tempRepeatDays }))
                                        }}
                                        className="appt-button"> {day.name}</Button></Col>)

                                }
                            </Row>
                        </Space>

                    }
                    {appointmentData.repeatType !== "No Repeat" && <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Text>Ending On</Text>
                        <DatePicker value={appointmentData.endDate} onChange={(value) => setAppointmentData(k => ({ ...k, endDate: value }))} style={{ width: '100%' }} />
                    </Space>} */}
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreateApptStep3;
