import { Card, Col, Row, Select, Tag, Typography } from "antd";
import React, { useState } from "react";

import CustomImage from "../generic-components/custom-image/CustomImage";
import "./HomePage.scss";

import { CompletedApptCheck } from "../util/SvgUtil";

import AppointmentInfoModal from "../calendar-page/AppointmentInfoModal";

import CommonUtil from "../util/CommonUtil";
import { utcToLocal } from "../util/TimeUtil";
import HomePageEmptyBlock from "./HomePageEmptyBlocks";
const { Text } = Typography;

const { Option } = Select;

const DoctorFilter = ({ data = [], onDoctorChange, selectedValue }) => {
  let doctorObj = data.reduce((total, current) => {
    total[current.providerId] = {
      key: current.providerId,
      value: current.providerName,
    };
    return total;
  }, {});

  return (
    <Select
      showSearch={true}
      value={selectedValue}
      bordered={false}
      onChange={onDoctorChange}
      style={{ width: "100%" }}
    >
      <Option key={0} value={0}>
        Staffs
      </Option>
      {Object.values(doctorObj).map((k) => (
        <Option key={k.key} value={k.key}>
          {k.value}
        </Option>
      ))}
    </Select>
  );
};

const UpcomingAppointments = (props) => {
  const [apptInfo, setApptInfo] = useState(null);
  const [filterValue, setFilterValue] = useState(0);

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        style={{ minHeight: "700px", borderRadius: "16px" }}
        title="Upcoming Appointments"
        bordered={false}
        className="UAWidget"
        extra={
          <DoctorFilter
            data={props.apptData}
            onDoctorChange={setFilterValue}
            selectedValue={filterValue}
          />
        }
      >
        {props.apptData &&
        props.apptData.filter((k) =>
          filterValue ? k.providerId === filterValue : true,
        ).length > 0
          ? props.apptData
              .filter((k) =>
                filterValue ? k.providerId === filterValue : true,
              )
              .map((appt) => (
                <div
                  className={
                    appt.status === "Completed" ? "UAcompletedState" : null
                  }
                >
                  <Row
                    className="UACard"
                    onClick={() => setApptInfo(appt.apptId)}
                  >
                    <Col md={4} className="UAPhotoCont">
                      <CustomImage
                        styling={{
                          width: "85px",
                          height: "85px",
                          showInfoIcon: false,
                          showOuterBorder: false,
                          url: appt?.image ? `url(` + appt?.image + `)` : "",
                          fullName: appt.firstName + " " + appt.lastName,
                        }}
                      ></CustomImage>
                      <div className="UACheckIcon">
                        {" "}
                        <CompletedApptCheck />
                      </div>
                    </Col>

                    <Col span={13} className="UADetailsPanel">
                      <Row>
                        <Col>
                          <Text
                            className="UAapptConfirmation"
                            style={{
                              color:
                                CommonUtil.APPOINTMENT_STATUS[appt.status]
                                  ?.color,
                            }}
                          >
                            {" "}
                            {appt.status}{" "}
                          </Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Text className="UAName">
                            {appt.firstName + " " + appt.lastName}{" "}
                          </Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Text className="UANotes">{appt.notes} </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={7} className="UATimePanel">
                      <Row justify="end">
                        <Col>
                          <Text className="UATime">
                            {utcToLocal(
                              appt.stTime,
                              "YYYY-MM-DDTHH:mm:ss",
                            ).format("h:mmA")}
                          </Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Tag
                            className={`UATagBase ${(appt.type ?? "").toLowerCase().replace(/\s+/g, "")}UATag`}
                            shape="round"
                            ghost
                          >
                            {appt.type}
                          </Tag>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              ))
          : HomePageEmptyBlock.displayEmptyUpcomingAppointments()}
      </Card>
      {apptInfo && (
        <AppointmentInfoModal
          onSearch={props.onSearch}
          appointmentDetails={props.apptData.find((k) => k.apptId === apptInfo)}
          handleStatusChange={(value) => {
            props.setApptData(
              props.apptData.map((k) =>
                k.apptId === apptInfo ? { ...k, status: value } : k,
              ),
            );
          }}
          onClose={() => {
            setApptInfo(null);
            props.getUpcomingAppointmentForAll();
          }}
          viewAppointment={props.viewAppointment}
        />
      )}
    </div>
  );
};

export default UpcomingAppointments;
