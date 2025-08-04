import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Select,
  Steps,
  Divider,
} from "antd";

import CustomImage from "../generic-components/custom-image/CustomImage";

import AppointmentServices from "./../../services/AppointmentServices";
import { CommonContext } from "../../context/CommonContext";
import CommonUtil from "../util/CommonUtil";
import TextArea from "antd/lib/input/TextArea";

//const { Step } = Steps;
const { Text, Link, Title } = Typography;
const { Option } = Select;

const AppointmentInfoModal = (props) => {
  const [apptClientInfo, setApptClientInfo] = useState({});
  const [reasonModal, setReasonModal] = useState({
    isOpen: false,
    reason: props.appointmentDetails.notes,
  });
  const context = useContext(CommonContext);

  useEffect(() => {
    AppointmentServices.fetchAppointmentModalInfo(
      props.appointmentDetails.apptId,
      (k) => setApptClientInfo(k),
    );
  }, []);

  const ReasonForVisitModal = (tempProps) => {
    const [reason, setReason] = useState(tempProps.reason ?? "");
    return (
      <Modal
        style={{ marginTop: "8em" }}
        onCancel={tempProps.onClose}
        footer={null}
        visible={true}
        title={"Reason for Visit"}
      >
        <Row style={{ marginBottom: 8 }}>
          <Col span={24}>
            <TextArea
              onChange={(e) => {
                let val = e.target.value;
                setReason(val);
              }}
              value={reason}
              autoSize={{ minRows: 5 }}
            />
          </Col>
        </Row>
        <Divider />
        <Row justify="space-between" gutter={[16, 0]}>
          <Col span={12}>
            {" "}
            <Button
              onClick={tempProps.onClose}
              shape="round"
              size="large"
              block
            >
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              size="large"
              shape="round"
              block
              onClick={() => {
                AppointmentServices.updateAppointmentNotesById(
                  tempProps.apptId,
                  { notes: reason },
                  (success) => {
                    success
                      ? setReasonModal((k) => ({ isOpen: false, reason }))
                      : tempProps.onClose();
                  },
                );
              }}
            >
              {"Save"}
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  };

  const handleStatusChange = (value, option) => {
    //console.log(" val ==>",value);
    AppointmentServices.updateAppointmentStatus(
      props.appointmentDetails.apptId,
      option.status,
      () => props.handleStatusChange(value),
    );
  };

  const onAppointmendtEdit = () => {
    let type = "appointment";
    props.onClose();
    let callback = () => props.onClose();
    AppointmentServices.getAppointmentById(
      props.appointmentDetails.apptId,
      (data) => {
        context.openCreateEditAny({ type, callback, requiredInputData: data });
      },
    );
  };

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
        <Col span={12} className="appointment-modal-confirmation">
          <Row>
            <Col className="wellness-header">
              <Row justify="center">
                <Col>
                  <CustomImage
                    styling={{
                      width: "116px",
                      height: "116px",
                      showInfoIcon:
                        props.appointmentDetails.alert === "N" ? false : true,
                      showOuterBorder: true,
                      toolTip: {
                        title: apptClientInfo?.patient?.alert,
                        placement: "top",
                      },
                      fullName:
                        props.appointmentDetails.firstName +
                        " " +
                        props.appointmentDetails.lastName,
                      url: apptClientInfo?.patient?.image
                        ? `url(` + apptClientInfo?.patient?.image + `)`
                        : "",
                      ringColor: CommonUtil.genderBasedColor(
                        apptClientInfo?.patient?.sexCd,
                      ),
                    }}
                  ></CustomImage>
                </Col>
              </Row>
              <Text className="apptModalTime">
                {" "}
                {props.appointmentDetails.displaytime}
              </Text>
              <br />
              <Link
                onClick={() =>
                  props.onSearch("Clients", {
                    type: "P",
                    id: apptClientInfo.patient.id,
                    clId: apptClientInfo?.client?.id,
                  })
                }
                className="appointment-details-name apptPatientName"
              >
                {props.appointmentDetails.firstName +
                  " " +
                  props.appointmentDetails.lastName}
              </Link>
              <br />
              <Text type="secondary" className="text-mute">
                {apptClientInfo?.patient?.breed}
              </Text>
              <br />
              <Select
                className="appointmentConfirmSelect"
                value={props.appointmentDetails.status}
                style={{
                  color:
                    CommonUtil.APPOINTMENT_MODAL_STATUS[
                      props.appointmentDetails.status
                    ]?.color,
                }}
                bordered={false}
                onChange={handleStatusChange}
              >
                {Object.values(CommonUtil.APPOINTMENT_MODAL_STATUS).map((k) => (
                  <Option status={k.status} value={k.value}>
                    {k.name}{" "}
                  </Option>
                ))}
              </Select>
              <br />
              <Row justify="center">
                <Col>
                  {" "}
                  <div
                    className={`${props.appointmentDetails.type.toLowerCase()}Tag`}
                  >
                    {" "}
                    {props.appointmentDetails.type}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="appointment-notes">
            <Row gutter={[10, 0]}>
              <Col>
                <Title className="apptModalSection" level={5}>
                  Reason for Visit
                </Title>
              </Col>
              <Col>
                <Link
                  style={{ fontSize: "16px", fontWeight: "500" }}
                  onClick={() =>
                    setReasonModal((k) => ({ ...k, isOpen: true }))
                  }
                >
                  Edit
                </Link>
              </Col>
            </Row>
            <Row>
              <Text className="text-mute apptModalSection">
                {reasonModal.reason}
              </Text>
            </Row>
            <Row>
              <Title className="apptModalSection" level={5}>
                Provider:
              </Title>
            </Row>
            <Row>
              <Text className="text-mute apptModalSection">
                {apptClientInfo?.provider?.fName +
                  " " +
                  apptClientInfo?.provider?.lName}
              </Text>
            </Row>
          </div>
        </Col>
        <Col span={12} className="appointment-owner-details">
          <Row>
            <Title className="apptModalSection" level={5}>
              Client Info
            </Title>
          </Row>
          <Row className="client-more-info">
            <Col>
              <Text className="aptModalInfoLabel apptModalSection">Name</Text>
              <div>
                <Link
                  className="apptModalSection"
                  onClick={() =>
                    props.onSearch("Clients", {
                      type: "C",
                      id: apptClientInfo.client.id,
                    })
                  }
                >
                  {apptClientInfo?.client?.fName +
                    " " +
                    apptClientInfo?.client?.lName}
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
                  {apptClientInfo?.client?.email}
                </Link>
              </div>
            </Col>
          </Row>
          <Row span={24} className="client-more-info">
            <Col span={12}>
              <Text className="aptModalInfoLabel">Phone </Text>
              <div>
                <Text className="apptModalSection">
                  {apptClientInfo?.client?.homePhone ?? "-"}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text className="aptModalInfoLabel">Mobile Phone </Text>
              <div>
                <Text className="apptModalSection">
                  {apptClientInfo?.client?.mobile ?? "-"}
                </Text>
              </div>
            </Col>
          </Row>
          <Row span={24} className="client-more-info">
            <Col span={12}>
              <Text className="aptModalInfoLabel">Alt Phone </Text>
              <div>
                <Text className="apptModalSection">
                  {apptClientInfo?.client?.altPhone ?? "-"}
                </Text>
              </div>
            </Col>
          </Row>

          <Space
            direction="vertical"
            style={{
              padding: "24px",
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            <Row justify="space-around">
              <Col>
                <Button
                  type="primary"
                  shape="round"
                  onClick={() =>
                    props.viewAppointment(
                      props.appointmentDetails.apptId,
                      apptClientInfo?.patient?.id,
                      props.appointmentDetails.providerId,
                      apptClientInfo?.client?.id,
                      props.appointmentDetails.tooltipTitle,
                    )
                  }
                >
                  Go to Appointment
                </Button>
              </Col>
            </Row>

            <Row justify="space-around">
              <Col>
                <Button
                  onClick={onAppointmendtEdit}
                  disabled={props.appointmentDetails.status === "Completed"}
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
                    AppointmentServices.deleteAppointmentById(
                      props.appointmentDetails.apptId,
                      props.onClose,
                    )
                  }
                  type="secondary"
                  disabled={props.appointmentDetails.status === "Completed"}
                  shape="round"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>

      {reasonModal.isOpen && (
        <ReasonForVisitModal
          reason={reasonModal.reason}
          apptId={props.appointmentDetails.apptId}
          onClose={() => setReasonModal((k) => ({ ...k, isOpen: false }))}
        />
      )}
    </Modal>
  );
};
export default AppointmentInfoModal;
