import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Button, List } from "antd";
import ReminderList from "./ReminderList";
import ReminderServices from "./../../services/ReminderServices";
import ReminderDrawer from "./ReminderDrawer";
import PatientServices from "../../services/PatientServices";
import UpcomingReminders from "../home-page/UpcomingReminders";

const { Title } = Typography;

const RemindersPatientTab = (props) => {
  const [reminderList, setReminderList] = useState([]);
  const [reminderDrawerObject, setReminderDrawerObject] = useState(null);

  const fetchPatientReminders = () => {
    PatientServices.fetchPatientReminders(props.patientId, setReminderList);
  };
  useEffect(() => {
    fetchPatientReminders();
  }, []);
  return (
    <>
      <Row>
        <Col span={24}>
          <Row justify="space-between" align="middle" gutter={[0, 16]}>
            <Col style={{ marginBottom: 24 }}>
              <Title level={5}>Upcoming Reminders</Title>
            </Col>
            <Col>
              <Button
                ghost
                shape="round"
                size="small"
                type="primary"
                onClick={() => {
                  setReminderDrawerObject({ isEdit: false, data: null });
                }}
              >
                Create Reminder
              </Button>
            </Col>
          </Row>
          <Row gutter={[0, 24]} style={{ marginBottom: 60 }}>
            <Col span={24}>
              {/* <ReminderList reminderList={reminderList.filter(e => e.completed===false)}/> */}
              <UpcomingReminders
                onSearch={props.onSearch}
                isHomePage={false}
                reminderList={reminderList.filter((e) => e.completed === false)}
                fetchReminders={() => fetchPatientReminders()}
              />
            </Col>
          </Row>
          <Row justify="space-between" align="middle" gutter={[0, 16]}>
            <Col style={{ marginBottom: 24 }}>
              <Title level={5}> Reminder History</Title>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <UpcomingReminders
                onSearch={props.onSearch}
                isHomePage={false}
                reminderList={reminderList.filter((e) => e.completed === true)}
                fetchReminders={() => fetchPatientReminders()}
              />
              {/* <ReminderList reminderList={reminderList.filter(e => e.completed===true)}/> */}
            </Col>
          </Row>
        </Col>
      </Row>
      {reminderDrawerObject && (
        <ReminderDrawer
          data={{ ...reminderDrawerObject.data, patientId: props.patientId }}
          isEdit={reminderDrawerObject.isEdit}
          onClose={() => setReminderDrawerObject(null)}
          onSuccess={() =>
            PatientServices.fetchPatientReminders(
              props.patientId,
              setReminderList,
            )
          }
        />
      )}
    </>
  );
};

export default RemindersPatientTab;
