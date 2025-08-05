import { CloseOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Checkbox,
  Col,
  Popconfirm,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import ReminderServices from "../../services/ReminderServices";
import ReminderDrawer from "../reminders/ReminderDrawer";
import ReminderModal from "../reminders/ReminderModal";
import { momentLocal } from "../util/TimeUtil";
import "./HomePage.scss";
import HomePageEmptyBlock from "./HomePageEmptyBlocks";
const { Text, Link } = Typography;

const mockData = [];

const StaffToDos = (props) => {
  const [reminderDrawerObject, setReminderDrawerObject] = useState(null);
  const [reminderModalObject, setReminderModalObject] = useState(null);
  const [data, setData] = useState(mockData);

  const fetchAllReminders = () => {
    try {
      if (props.isHomePage) {
        // Get zoneId from localStorage
        const zoneId = localStorage.getItem("zoneId");
        ReminderServices.getAllReminderForHome(zoneId, (tempData) => {
          if (tempData && tempData.length > 0) {
            const sortedData = [...tempData].sort((a, b) =>
              a.completed ? 1 : -1,
            );
            setData(sortedData.filter((k) => k.type === "Task"));
          } else {
            setData([]);
          }
        });
      } else if (props.staffId) {
        ReminderServices.getRemindersForStaff(props.staffId, (tempData) => {
          if (tempData && tempData.length > 0) {
            const sortedData = [...tempData].sort((a, b) =>
              a.completed ? 1 : -1,
            );
            setData(sortedData.filter((k) => k.type === "Task"));
          } else {
            setData([]);
          }
        });
      }
    } catch (error) {
      console.error("Error in fetchAllReminders:", error);
      setData([]);
    }
  };

  useEffect(() => {
    setData(props.reminderList);
  }, [props.reminderList]);

  useEffect(() => {
    fetchAllReminders();
  }, []);

  const checkTodaysDate = (date) => {
    return momentLocal(date).isSame(momentLocal().format("YYYY-MM-DD"), "day")
      ? "Today"
      : momentLocal(date).isBefore(momentLocal().format("YYYY-MM-DD"), "day")
        ? "Overdue"
        : momentLocal(date, "YYYY-MM-DD").format("MM/DD/YYYY");
  };

  let cardStyle =
    true == true
      ? { style: { minHeight: "700px", borderRadius: "16px" } }
      : { headStyle: { display: "none" } };

  const Children = () => (
    <>
      {data && data.length > 0 ? (
        <Space direction="vertical" size="0" style={{ width: "100%" }}>
          {data.map((reminderdata) => (
            <Fragment key={reminderdata.id}>
              <Row
                className={
                  reminderdata.completed
                    ? "remindersCompletedItem"
                    : "remindersItem"
                }
                justify="space-between"
                style={{ cursor: "pointer" }}
              >
                <Col
                  onClick={() => {
                    reminderdata.completed
                      ? ReminderServices.getCompletedReminderViewById(
                          reminderdata.id,
                          reminderdata.source,
                          (data) => {
                            setReminderModalObject({
                              id: reminderdata.id,
                              name: reminderdata.name,
                              source: reminderdata.source,
                              data: {
                                ...data,
                                users: reminderdata.users,
                                completed: true,
                              },
                            });
                          },
                        )
                      : ReminderServices.getReminderViewById(
                          reminderdata.id,
                          reminderdata.source,
                          (data) => {
                            setReminderModalObject({
                              id: reminderdata.id,
                              name: reminderdata.name,
                              data: { ...data, users: reminderdata.users },
                            });
                          },
                        );
                  }}
                >
                  <Checkbox
                    className={
                      reminderdata.completed ? "full-check" : "half-check"
                    }
                    checked={true}
                    //   onClick={()=>ReminderServices.completeReminder(reminderdata.id,fetchAllReminders)}
                  />
                </Col>

                <Col
                  style={{ paddingLeft: "6px" }}
                  span={14}
                  onClick={() => {
                    reminderdata.completed
                      ? ReminderServices.getCompletedReminderViewById(
                          reminderdata.id,
                          reminderdata.source,
                          (data) => {
                            setReminderModalObject({
                              id: reminderdata.id,
                              name: reminderdata.name,
                              source: reminderdata.source,
                              data: {
                                ...data,
                                users: reminderdata.users,
                                completed: true,
                              },
                            });
                          },
                        )
                      : ReminderServices.getReminderViewById(
                          reminderdata.id,
                          reminderdata.source,
                          (data) => {
                            setReminderModalObject({
                              id: reminderdata.id,
                              name: reminderdata.name,
                              data: { ...data, users: reminderdata.users },
                            });
                          },
                        );
                  }}
                >
                  <Row>
                    <Col>
                      {" "}
                      <Text className="remindersTitle">
                        {reminderdata.name}{" "}
                      </Text>{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="remindersDetails">
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
                      {`${reminderdata.type !== "Task" ? "|" : " "}`}{" "}
                      <Link>{reminderdata.patient}</Link>{" "}
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row
                    style={{ float: "right" }}
                    align="middle"
                    gutter={[8, 0]}
                  >
                    <Col>
                      <Avatar.Group maxCount={3}>
                        {reminderdata.users?.map((k) =>
                          k.image ? (
                            <Tooltip
                              title={k.fName + " " + k.lName}
                              placement="top"
                            >
                              <Avatar src={k.image} />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title={k.fName + " " + k.lName}
                              placement="top"
                            >
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
                            </Tooltip>
                          ),
                        )}
                      </Avatar.Group>
                    </Col>
                    <Col>
                      <Popconfirm
                        title="Are you sure you want to delete this?"
                        okText="Yes"
                        okButtonProps={{ shape: "round" }}
                        cancelText="No"
                        cancelButtonProps={{ shape: "round" }}
                        onConfirm={() =>
                          ReminderServices.deleteReminder(
                            reminderdata.id,
                            reminderdata.source,
                            fetchAllReminders,
                          )
                        }
                      >
                        <CloseOutlined
                          className="reminderCloseIcon"
                          style={{ fontSize: "1.3em" }}
                        />
                      </Popconfirm>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Fragment>
          ))}
        </Space>
      ) : (
        HomePageEmptyBlock.displayEmptyToDos(props.isHomePage ? "200" : "100")
      )}
    </>
  );
  return (
    <>
      <div className="site-card-border-less-wrapper">
        {props.isHomePage ? (
          <Card
            {...cardStyle}
            className="remindersWidget"
            title="Staff To-Dos"
            bordered={false}
            extra={
              <a
                href="#"
                onClick={() => {
                  setReminderDrawerObject({ isEdit: false, data: null });
                }}
              >
                Add New
              </a>
            }
          >
            <Children />
          </Card>
        ) : (
          <div className="remindersWidget">
            <Children />
          </div>
        )}
      </div>
      {reminderDrawerObject && (
        <ReminderDrawer
          isToDo={true}
          onSearch={props.onSearch}
          data={reminderDrawerObject.data}
          isEdit={reminderDrawerObject.isEdit}
          onClose={() => setReminderDrawerObject(null)}
          onSuccess={() => fetchAllReminders()}
        />
      )}
      {reminderModalObject && (
        <ReminderModal
          isToDo={true}
          onSearch={props.onSearch}
          name={reminderModalObject.name}
          source={reminderModalObject.source}
          data={reminderModalObject.data}
          onEdit={() => {
            setReminderModalObject(null);
            ReminderServices.getReminderById(
              reminderModalObject.id,
              reminderModalObject.source,
              (data) => {
                setReminderDrawerObject({ isEdit: true, data });
              },
            );
          }}
          onClose={() => {
            setReminderModalObject(null);
            fetchAllReminders();
          }}
        />
      )}
    </>
  );
};

export default StaffToDos;
