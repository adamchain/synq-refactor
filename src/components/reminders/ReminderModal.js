import React from "react";
import {
  Modal,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Select,
  Popover,
  Avatar,
  Layout,
  Tooltip,
} from "antd";
import CustomImage from "./../generic-components/custom-image/CustomImage";
import "./Reminder.scss";
import ReminderServices from "../../services/ReminderServices";
import { utcToLocal } from "../util/TimeUtil";
const { Text, Link, Title } = Typography;
const { Option } = Select;
const { Content } = Layout;

const ReminderModal = (props) => {
  const ActionPart = () => {
    return (
      <Row
        justify="space-between"
        align="bottom"
        style={{ minHeight: props.isToDo ? 150 : 240 }}
      >
        <Col span={24}>
          <Row gutter={[0, 8]} justify="space-around">
            <Col span={24}>
              <Button
                style={{ marginBottom: 8 }}
                type="primary"
                shape="round"
                block
                disabled={props.data.completed}
                onClick={() => {
                  ReminderServices.completeReminder(
                    props.data.id,
                    props.source,
                    props.onClose,
                  );
                }}
              >
                Complete
              </Button>
            </Col>
          </Row>

          <Row gutter={[0, 8]} justify="space-around">
            <Col span={24}>
              <Button
                style={{ marginBottom: 8 }}
                block
                disabled={props.data.completed}
                onClick={props.onEdit}
                type="secondary"
                shape="round"
              >
                Edit
              </Button>
            </Col>
          </Row>
          <Row gutter={[0, 8]} justify="space-around">
            <Col span={24}>
              <Button
                block
                disabled={props.data.completed}
                type="secondary"
                shape="round"
                onClick={() => {
                  ReminderServices.deleteReminder(
                    props.data.id,
                    props.source,
                    props.onClose,
                  );
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  let rightBorderStyle = props.isToDo
    ? {
        backgroundColor: "white",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
      }
    : {};
  return (
    <Modal
      className="reminder-modal"
      visible={true}
      onCancel={props.onClose}
      footer={null}
      width={props.isToDo ? "480px" : "740px"}
    >
      <Row>
        {" "}
        <Col
          span={props.isToDo ? 24 : 12}
          style={rightBorderStyle}
          className="reminder-modal-left"
        >
          <Row gutter={[0, 16]} className="table-title-top">
            <Col>
              <Title level={5}>{props.name ? props.name : "No Title"}</Title>
            </Col>
          </Row>
          {props.data.descr ? (
            <Row gutter={[0, 16]}>
              <Col>
                <p level={5}>{props.data.descr}</p>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row justify="space-between">
            <Col span={12}>
              <Text style={{ fontWeight: 500 }}>Type</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontWeight: 500 }}>Due</Text>
            </Col>
          </Row>
          <Row
            className="table-title-top"
            gutter={[0, 16]}
            justify="space-between"
          >
            <Col span={12}>
              <Text>{props.data.reminder}</Text>
            </Col>
            <Col span={12}>
              <Text>
                {utcToLocal(props.data.due, "YYYY-MM-DD").format("MM/DD/YYYY")}
              </Text>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Text style={{ fontWeight: 500 }}>Repeats</Text>
            </Col>{" "}
            {props.data.completed && (
              <Col span={12}>
                <Text style={{ fontWeight: 500 }}>Completed</Text>
              </Col>
            )}
          </Row>
          <Row
            className="table-title-top"
            gutter={[0, 24]}
            justify="space-between"
          >
            <Col span={12}>
              <Text>{props.data.repeat ? props.data.repeat : "None"}</Text>
            </Col>{" "}
            {props.data.completed && (
              <Col span={12}>
                <Text>
                  {utcToLocal(
                    props.data.completedTime,
                    "YYYY-MM-DDTHH:mm:ss",
                  ).format("MM/DD/YYYY hh:mm A")}
                </Text>
              </Col>
            )}
          </Row>

          {props.data.reminder !== "Task" && (
            <>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    Regarding
                  </Text>
                </Col>
              </Row>
              <Row
                className="table-title-top"
                justify="start"
                align="middle"
                gutter={[16, 24]}
              >
                <Col>
                  <CustomImage
                    styling={{
                      width: "50px",
                      height: "50px",
                      showOuterBorder: false,
                      url: props.data.patient?.image
                        ? `url(` + props.data.patient?.image + `)`
                        : "",
                      fullName: props.data.patient?.name,
                    }}
                  />
                </Col>
                <Col>
                  <Row style={{ marginBottom: "-3px" }}>
                    <Col>
                      <Link
                        style={{ fontSize: 16 }}
                        onClick={() =>
                          props.onSearch("Clients", {
                            type: "P",
                            id: props.data.patient?.id,
                            clId: props.data.client?.id,
                          })
                        }
                        className="appointment-details-name apptPatientName"
                      >
                        {props.data.patient?.name ?? ""}
                      </Link>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]}>
                    <Col>
                      <Text className="reminderBreed" type="secondary">
                        {props.data.patient?.breed ?? ""}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>{" "}
            </>
          )}

          <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
            <Col>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {props.data.completed ? "Completed By" : "Assigned To"}
              </Text>
            </Col>
          </Row>
          <Row gutter={[0, 8]}>
            <Col>
              <Avatar.Group maxCount={3} size="large">
                {props.data.users?.map((k) =>
                  k.image ? (
                    <Tooltip title={k.fName + " " + k.lName} placement="top">
                      <Avatar style={{ width: 50, height: 50 }} src={k.image} />
                    </Tooltip>
                  ) : (
                    <Tooltip title={k.fName + " " + k.lName} placement="top">
                      <Avatar
                        style={{
                          backgroundColor: "#002729",
                          fontWeight: 500,
                          fontSize: "18px",
                          lineHeight: "50px",
                          width: 50,
                          height: 50,
                        }}
                        shape="circle"
                      >
                        {k.fName.charAt(0) + k.lName.charAt(0)}
                      </Avatar>
                    </Tooltip>
                  ),
                )}
                {/* <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} /> */}
              </Avatar.Group>
            </Col>
          </Row>

          {props.isToDo && <ActionPart />}

          {/* 
      <Space direction="vertical"
        className="wellness-header"
        align="center">
        <CustomImage
          styling={{
            width: '116px',
            height: '116px',
            showInfoIcon: true,
            showOuterBorder: true,
            toolTip: {
              title: 'Sedation needed while nail trims',
              placement: 'top',
            },
            url: `url(http://${window.location.host}whskrwoodhouse1.jpg)`
          }}>
        </CustomImage>
        <Text className="apptModalTime"> displaytime</Text>
        <Link className="appointment-details-name apptPatientName">
    firstName
        </Link>
        <Text type="secondary" className="text-mute">
    .breed
        </Text>
        <Select className="appointmentConfirmSelect" value={"Confirmed"}
          style={{  color: 'green'}}
          bordered={false}
          onChange={()=>{}}>
          <Option value="UnConfirmed" >Unconfirmed</Option>
          <Option value="Confirmed"  >Confirmed</Option>

        </Select>       
      </Space> */}
        </Col>
        {!props.isToDo && (
          <Col span={12} className="appointment-owner-details">
            <Row>
              <Title
                className="apptModalSection"
                style={{ fontWeight: 600 }}
                level={5}
              >
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
                        id: props.data?.client?.id,
                      })
                    }
                  >
                    {props.data?.client?.name ?? "-"}
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
                    {props.data?.client?.email ?? "-"}
                  </Link>
                </div>
              </Col>
            </Row>
            <Row gutter={[0, 140]} span={24} className="client-more-info">
              <Col span={12}>
                <Text className="aptModalInfoLabel"> Cell (Primary) </Text>
                <div>
                  <Text className="apptModalSection">
                    {props.data?.client?.cell ?? "-"}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <Text className="aptModalInfoLabel">Phone </Text>
                <div>
                  <Text className="apptModalSection">
                    {props.data?.client?.phone ?? "-"}
                  </Text>
                </div>
              </Col>
            </Row>

            {/* <Space direction="vertical" style={{
          padding: "1em",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0
        }}
        > */}
            <ActionPart />
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default ReminderModal;
