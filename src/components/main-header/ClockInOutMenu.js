import React, { useState, useContext, useEffect } from "react";
import {
  Dropdown,
  Menu,
  Col,
  Row,
  Checkbox,
  Typography,
  Input,
  Button,
  Select,
} from "antd";

import { ClockinIcon } from "../util/SvgUtil";
import "./MainHeader.scss";
import "./ClockInOutMenu.scss";

import ClockInOutServices from "../../services/ClockInOutServices";
import { CommonContext } from "../../context/CommonContext";
import StaffServices from "../../services/StaffServices";
import CommonUtil from "../util/CommonUtil";

const { Text, Title } = Typography;
const { Option } = Select;

const descriptions = [
  { name: "Shift Start", value: 1 },
  { name: "Shift End", value: 2 },
  { name: "Break Start", value: 3 },
  { name: "Break Return", value: 4 },
  { name: "Appt", value: 5 },
  { name: "Other", value: 6 },
];

const ClockInOutMenu = () => {
  const commonContext = useContext(CommonContext);
  const [inputValues, setInputValues] = useState({
    empId: commonContext.userProfile.userId,
    option: "",
    name: commonContext.userProfile.firstName,
  });
  const [sucessOrError, setSucessOrError] = useState({
    status: null,
    type: "",
  });
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    StaffServices.fetchStaff((data) => {
      let allowedRoles = commonContext.defaultBranch?.clockIn ?? {};
      let allowedRoleNames = Object.keys(CommonUtil.STAFF_ROLES)
        .filter((k) => allowedRoles[k])
        .map((k) => CommonUtil.STAFF_ROLES[k]?.name);
      setStaffs((k) =>
        data
          .filter(
            (k) =>
              allowedRoleNames.includes(k.role) ||
              k.userId === inputValues.empId,
          )
          .map((v) => ({ ...v, displayName: v.firstName + " " + v.lastName })),
      );
    });
  }, [commonContext.defaultBranch?.clockIn]);
  const showSuccessMessage = (status, type) => {
    setTimeout(() => {
      setSucessOrError({ status: status ? "success" : "error", type });
    }, 2000);
    setTimeout(() => {
      setSucessOrError({ status: null, type: "" });
    }, 5000);
  };
  const menu = (
    <Menu className="clock-dropdown-menu">
      {sucessOrError.status === "error" ||
      sucessOrError.status === "success" ? (
        sucessOrError.status === "success" ? (
          <Row
            style={{ padding: "2em" }}
            justify="center"
            align="middle"
            span={24}
          >
            <Col>
              <Row justify="center" align="middle">
                <Col>
                  <div class="success-checkmark">
                    <div class="check-icon">
                      <span class="icon-line line-tip"></span>
                      <span class="icon-line line-long"></span>
                      <div class="icon-circle"></div>
                      <div class="icon-fix"></div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Title level={5}>{`Hey  ${inputValues.name},`}</Title>
                </Col>
              </Row>
              <Row
                style={{ marginBottom: "1em" }}
                justify="center"
                align="middle"
              >
                <Col>
                  <Title level={5}> You're Clocked {sucessOrError.type}</Title>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Text type="secondary" italic>
                    Reloading...
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row
            style={{ padding: "2em" }}
            span={24}
            justify="center"
            align="middle"
          >
            <Col>
              <Row justify="center" align="middle">
                <Col>
                  <div class="error-x-container">
                    <div class="error-x-mark">
                      <span class="icon-line line-left"></span>
                      <span class="icon-line line-right"></span>
                      <div class="error-circle"></div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Title level={5}>There was an issue</Title>
                </Col>
              </Row>
              <Row
                style={{ marginBottom: "1em" }}
                justify="center"
                align="middle"
              >
                <Col>
                  <Title level={5}>clocking you {sucessOrError.type}</Title>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Text type="secondary">
                    Make sure you Clocked{" "}
                    {sucessOrError.type === "In" ? "Out" : "In"}{" "}
                  </Text>
                </Col>
              </Row>
              <Row
                style={{ marginBottom: "1em" }}
                justify="center"
                align="middle"
              >
                <Col>
                  <Text type="secondary">
                    before you clock {sucessOrError.type}
                  </Text>
                </Col>
              </Row>

              <Row justify="center" align="middle">
                <Col>
                  <Text type="secondary" italic>
                    Reloading...
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        )
      ) : (
        <Row className="profile-name">
          <Col span={24}>
            <Row style={{ marginBottom: "1.5em" }}>
              <Col>
                <Text className="profileDDName">Quick Clock In/Out</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: "0.5em" }}>
              <Col>
                <Text>Employee ID</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1.5em" }}>
              <Col span={24}>
                <Select
                  size="large"
                  showSearch={true}
                  value={inputValues.empId}
                  filterOption={(input, option) =>
                    option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value, option) => {
                    setInputValues((k) => ({
                      ...k,
                      empId: value,
                      name: option.firstName,
                    }));
                  }}
                  placeholder={<Text>Select an Employee</Text>}
                  style={{ width: "100%", marginBottom: "24px" }}
                >
                  {staffs.map((k) => (
                    <Option
                      key={k.userId}
                      firstName={k.firstName}
                      value={k.userId}
                    >
                      {k.displayName}
                    </Option>
                  ))}
                </Select>
                {/* <Input disabled value = {inputValues.empId} 
            onChange={(e)=>{
                let value = e.target.value;
                setInputValues(k=>({...k,empId:value}))}} size="large" type="number"/> */}
              </Col>
            </Row>
            <Row style={{ marginBottom: "0.5em" }}>
              <Col>
                <Text>Description</Text>
              </Col>
            </Row>
            <Row
              style={{ marginBottom: "1.5em" }}
              justify="space-around"
              gutter={[0, 8]}
            >
              {descriptions.map((k) => (
                <Col span={12}>
                  <Checkbox
                    checked={k.value === inputValues.option}
                    onChange={(e) => {
                      let checked = e.target.checked;
                      //setInputValues(v=>({...v,descriptions:checked?[...v.descriptions,k.value]:v.descriptions.filter(u=>u!==k.value)}))
                      setInputValues((v) => ({
                        ...v,
                        option: checked ? k.value : "",
                      }));
                    }}
                    style={{ fontSize: "12px" }}
                    value={k.value}
                    //checked={inputValues.descriptions.includes(k.value)}
                  >
                    <Text type="secondary">{k.name}</Text>
                  </Checkbox>
                </Col>
              ))}
            </Row>
            <Row justify="space-around">
              <Col span={12} style={{ paddingRight: 6 }}>
                {" "}
                <Button
                  disabled={!inputValues.option}
                  block
                  size="small"
                  loading={sucessOrError.status === "clockIn"}
                  onClick={() => {
                    setSucessOrError((k) => ({ ...k, status: "clockIn" }));
                    ClockInOutServices.clockIn(
                      {
                        empId: inputValues.empId,
                        inOption: inputValues.option,
                      },
                      (data) => showSuccessMessage(data, "In"),
                    );
                  }}
                  shape="round"
                >
                  Clock In
                </Button>
              </Col>
              <Col span={12} style={{ paddingLeft: 6 }}>
                <Button
                  size="small"
                  block
                  loading={sucessOrError.status === "clockOut"}
                  disabled={!inputValues.option}
                  onClick={() => {
                    setSucessOrError((k) => ({ ...k, status: "clockOut" }));
                    ClockInOutServices.clockOut(
                      {
                        empId: inputValues.empId,
                        outOption: inputValues.option,
                      },
                      (data) => showSuccessMessage(data, "Out"),
                    );
                  }}
                  shape="round"
                >
                  Clock Out
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Menu>
  );
  return (
    <>
      <Dropdown className="profile-dropdown" overlay={menu} trigger="click">
        <div className="message">
          <ClockinIcon />
        </div>
      </Dropdown>
    </>
  );
};

export default ClockInOutMenu;
