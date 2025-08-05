import React from "react";
import { Col, Row, Typography } from "antd";
import {
  DrawerEmpty,
  RemindersEmpty,
  UpcomingAppointmentsEmpty,
  WhskrPetEmpty,
  LotExpirationEmpty,
  ApptOverviewEmpty,
} from "../util/EmptySvgUtil";
import "./HomePage.scss";
const { Text, Title } = Typography;
export default class HomePageEmptyBlock {
  static displayEmptyUpcomingAppointments = () => {
    return (
      <>
        <Row style={{ marginTop: "15%" }} justify="center" align="middle">
          <Col>
            <UpcomingAppointmentsEmpty />
          </Col>
        </Row>
        <Row style={{ marginTop: "5%" }} justify="center" align="middle">
          <Col>
            <Text className="empty-text">No Upcoming Appointments</Text>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <Text className="empty-text">to Show</Text>
          </Col>
        </Row>
      </>
    );
  };

  static displayEmptyLowInventory = () => {
    return (
      <>
        <Row style={{ marginTop: "5%" }} justify="center" align="middle">
          <Col>
            <DrawerEmpty />
          </Col>
        </Row>
        <Row style={{ marginTop: "2%" }} justify="center" align="middle">
          <Col>
            <Text className="empty-text">No Products to Show</Text>
          </Col>
        </Row>
      </>
    );
  };

  static displayEmptyReminders = (width) => {
    return (
      <>
        <Row style={{ marginTop: "32px" }} justify="center" align="middle">
          <Col>
            <RemindersEmpty width={width} />
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <Text className="empty-text">No Reminders to Show</Text>
          </Col>
        </Row>
      </>
    );
  };

  static displayEmptyToDos = (width) => {
    return (
      <>
        <Row
          style={{ marginTop: "32px", marginBottom: "10px" }}
          justify="center"
          align="middle"
        >
          <Col>
            <RemindersEmpty width={width} />
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <Text className="empty-text">No Tasks to Show</Text>
          </Col>
        </Row>
      </>
    );
  };

  static displayEmptyAppointmentOverview = (data) => {
    return (
      <>
        <Row justify="center" align="middle">
          {" "}
          <Col span={24}>
            <Row justify="center" align="middle">
              <Col style={{ textAlign: "center" }} span={24}>
                <ApptOverviewEmpty {...data} />
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col>
                <Text className="empty-text">
                  No Appointment Overview to Show
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  static displayEmptyLotExpirations = () => {
    return (
      <>
        <Row style={{ marginTop: "5%" }} justify="center" align="middle">
          <Col>
            <LotExpirationEmpty />
          </Col>
        </Row>
        <Row style={{ marginTop: "2%" }} justify="center" align="middle">
          <Col>
            <Text className="empty-text">No Expirations Found</Text>
          </Col>
        </Row>
      </>
    );
  };
}
