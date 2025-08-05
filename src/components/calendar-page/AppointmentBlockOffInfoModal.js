import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Typography, Row, Col, Space } from "antd";

import AppointmentServices from "../../services/AppointmentServices";
import { CommonContext } from "../../context/CommonContext";

const { Text, Link, Title } = Typography;

const AppointmentBlockOffInfoModal = (props) => {
  const [apptInfo, setApptInfo] = useState({});
  const context = useContext(CommonContext);

  useEffect(() => {
    //AppointmentServices.fetchAppointmentModalInfo(props.appointmentDetails.apptId,k => setApptInfo(k));

    AppointmentServices.getBlockOffAppointmentById(
      props.appointmentDetails.apptId,
      (data) => {
        setApptInfo(data);
      },
    );
  }, []);

  const handleStatusChange = (value, option) => {
    //console.log(" val ==>",value);
    AppointmentServices.updateAppointmentStatus(
      props.appointmentDetails.apptId,
      option.status,
      () => props.handleStatusChange(value),
    );
  };

  const onAppointmendtEdit = () => {
    let type = "block-off";
    props.onClose();
    let callback = () => props.onClose();

    context.openCreateEditAny({ type, callback, requiredInputData: apptInfo });
  };

  let startDate = props.appointmentDetails.start;
  let endDate = props.appointmentDetails.end;

  startDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
  endDate = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;

  return (
    <Modal
      visible={true}
      onCancel={() => props.onClose()}
      footer={null}
      width={"740px"}
      className="appointment-modal"
    >
      <Row>
        {" "}
        <Col
          span={12}
          style={{ textAlign: "unset" }}
          className="appointment-modal-confirmation wellness-header"
        >
          <Row>
            <Col>
              <Title className="apptModalSection" level={5}>
                Block Off
              </Title>
            </Col>
          </Row>

          <Row>
            <Col>
              <Title className="text-mute  apptModalSection" level={5}>
                {props.appointmentDetails.notes}
              </Title>
            </Col>
          </Row>

          <Row justify="start">
            <Col span={12}>
              <Text className="aptModalInfoLabel">Date </Text>
            </Col>
            <Col span={12}>
              <Text className="aptModalInfoLabel">Time </Text>
            </Col>
          </Row>
          <Row justify="start">
            <Col span={12}>
              <Text className="apptModalSection">
                {startDate === endDate
                  ? startDate
                  : startDate + " - " + endDate}
              </Text>
            </Col>
            <Col span={12}>
              <Text className="apptModalSection">
                {props.appointmentDetails.allDay
                  ? "All Day"
                  : props.appointmentDetails.displayday}
              </Text>
            </Col>
          </Row>
        </Col>
        <Col span={12} className="appointment-owner-details">
          <Row>
            <Title className="apptModalSection" level={5}>
              Staff Info
            </Title>
          </Row>
          <Row className="client-more-info">
            <Col>
              <Text className="aptModalInfoLabel apptModalSection">Name</Text>
              <div>
                <Link
                  className="apptModalSection"
                  onClick={() =>
                    props.onSearch("Staff", { staffId: apptInfo.usrId })
                  }
                >
                  {apptInfo.firstName + " " + apptInfo.lastName}
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="client-more-info">
            <Col>
              <Text className="aptModalInfoLabel apptModalSection">
                Email Address
              </Text>
              <div>
                <Link
                  className="apptModalSection"
                  href="mailto:carla.polittedvm@gmail.com"
                >
                  {apptInfo.email}
                </Link>
              </div>
            </Col>
          </Row>
          <Row span={24} className="client-more-info">
            <Col span={12}>
              <Text className="aptModalInfoLabel">Cell (Primary) </Text>
              <div>
                <Text className="apptModalSection">{apptInfo.cellPhone}</Text>
              </div>
            </Col>
            <Col span={12}>
              <Text className="aptModalInfoLabel"> Phone </Text>
              <div>
                <Text className="apptModalSection">{"-"}</Text>
              </div>
            </Col>
          </Row>
          {/* <Row span={24} className='client-more-info'>
              <Col span={12}><Text className="aptModalInfoLabel">Alt Phone </Text>
                <div><Text className="apptModalSection">{apptInfo?.client?.mobile}</Text></div>
                </Col>
              </Row> */}

          <Space
            direction="vertical"
            style={{
              //   padding: "24px",
              width: "100%",
              //   position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            {/* <Row justify="space-around">
                <Col>
                  <Button type="primary" shape="round"
                    onClick={
                      () => props.viewAppointment(props.appointmentDetails.apptId,apptInfo?.patient?.id,props.appointmentDetails.providerId,apptInfo?.client?.id,props.appointmentDetails.tooltipTitle)
                      }>
                   Edit this Event
                  </Button>
                </Col>
              </Row> */}

            <Row justify="space-around" style={{ marginTop: "80px" }}>
              <Col>
                <Button
                  onClick={onAppointmendtEdit}
                  type="secondary"
                  shape="round"
                >
                  Edit
                </Button>
              </Col>
            </Row>
            <Row justify="space-around">
              <Col>
                <Button
                  onClick={() =>
                    AppointmentServices.deleteBlockOffAppointmentById(
                      props.appointmentDetails.apptId,
                      props.onClose,
                    )
                  }
                  type="secondary"
                  shape="round"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};
export default AppointmentBlockOffInfoModal;
