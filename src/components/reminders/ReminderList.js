import React from "react";
import { List, Row, Col, Typography, Avatar, Checkbox } from "antd";
import RoundCheckbox from "./../generic-components/round-checkbox/RoundCheckbox";
import { CloseOutlined } from "@ant-design/icons";
import { momentLocal } from "../util/TimeUtil";
import HomePageEmptyBlock from "../home-page/HomePageEmptyBlocks";
const { Text } = Typography;

const checkTodaysDate = (date) => {
  return momentLocal(date).isSame(momentLocal().format("YYYY-MM-DD"), "day")
    ? "Today"
    : momentLocal(date).isBefore(momentLocal().format("YYYY-MM-DD"), "day")
      ? "Overdue"
      : momentLocal(date, "YYYY-MM-DD").format("MM/DD/YYYY");
};
const ReminderList = (props) => {
  return (
    <List
      size="large"
      dataSource={props.reminderList}
      locale={{ emptyText: HomePageEmptyBlock.displayEmptyReminders() }}
      renderItem={(reminderdata, index) => (
        <List.Item key={reminderdata.id || index}>
          <List.Item.Meta
            description={
              <Row
                //className={reminderdata.completed?"remindersCompletedItem":"remindersItem"}

                justify="space-between"
                align="middle"
              >
                <Col span={2}>
                  <Checkbox
                    className={
                      reminderdata.completed ? "full-check" : "half-check"
                    }
                    checked={true}
                    //   onClick={()=>ReminderServices.completeReminder(reminderdata.id,fetchAllReminders)}
                  />
                </Col>

                <Col span={22}>
                  <Row>
                    <Col span={24}>
                      {" "}
                      <Text className="reminderTitle">
                        {reminderdata.name}{" "}
                      </Text>{" "}
                    </Col>
                  </Row>
                  {/* |  <a>{reminderdata.patient}</a> */}
                  <Row>
                    <Col span={24}>
                      {" "}
                      <Text
                        style={{
                          color: reminderdata.completed
                            ? "green"
                            : (checkTodaysDate(reminderdata.date) === "Today" ||
                                  checkTodaysDate(reminderdata.date)) ===
                                "Overdue"
                              ? "red"
                              : "",
                        }}
                      >
                        {reminderdata.completed
                          ? "Completed"
                          : checkTodaysDate(reminderdata.date)}
                      </Text>{" "}
                      | <Text>{reminderdata.type} </Text>{" "}
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
          />
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Avatar.Group maxCount={3}>
                {reminderdata.users?.map((k) =>
                  k.image ? (
                    <Avatar src={k.image} />
                  ) : (
                    <Avatar
                      style={{
                        backgroundColor: "#002729",
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                      shape="circle"
                    >
                      {k.fName.charAt(0) + k.lName.charAt(0)}
                    </Avatar>
                  ),
                )}
                {/* <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} />
        <Avatar src={`http://${window.location.host}/whskrwoodhouse1.jpg?resize=100,100`} /> */}
              </Avatar.Group>
            </Col>
            <Col>
              <CloseOutlined style={{ fontSize: "1.3em" }} />
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default ReminderList;
