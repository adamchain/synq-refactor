import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Button,
  DatePicker,
  Modal,
  Typography,
  Col,
  Select,
  Checkbox,
  Input,
  TimePicker,
} from "antd";

import "./AppointmentModal.scss";

import AppointmentServices from "./../../services/AppointmentServices";

import { localToUtc, momentLocal, utcToLocal } from "../util/TimeUtil";
import { CommonContext } from "../../context/CommonContext";

const { Text } = Typography;
const { Option } = Select;

const BlockOffModal = (props) => {
  const context = useContext(CommonContext);
  const [requiredInputData, setRequiredInputData] = useState({
    staffDetails: [],
  });
  const [blockOffData, setBlockOffData] = useState({
    userId: context.userProfile?.userId,
    reason: null,
    timeRange: [],
    dateRange: [],
    isAllDay: false,
  }); //TODO : change staff id to login user

  useEffect(() => {
    AppointmentServices.fetchAllVets((data) =>
      setRequiredInputData((k) => ({ ...k, staffDetails: data })),
    );
    //let doctorDetails = allStaff.filter(e => !e.role.includes("FRONTDESK"));
    //let doctorDetails = [{id:1,name:"Dr. Carla Politte(Primary)"},{id:2,name:"Dr. Joseph Bryan"}];
    //setRequiredInputData(k=>({...k,patientDetails,doctorDetails}));
  }, []);

  useEffect(() => {
    if (props.data) {
      let startTime = momentLocal(
        props.data.stDate + " " + props.data.stTime,
        "YYYY-MM-DD HH:mm:ss",
      );
      let endTime = momentLocal(
        props.data.endDate + " " + props.data.endTime,
        "YYYY-MM-DD HH:mm:ss",
      );

      let inputData = {
        userId: props.data.usrId,
        isAllDay: !!props.data.allDay,
        reason: props.data.reason,
        dateRange: [startTime, endTime],
        timeRange: [startTime, endTime],
      };
      setBlockOffData(inputData);
    }
  }, [props.data]);

  const handleSubmit = () => {
    let submitData = { ...blockOffData };
    if (submitData.isAllDay) {
      submitData.timeRange = [
        momentLocal().startOf("day"),
        momentLocal().endOf("day"),
      ];
    }
    let starttime = momentLocal(
      submitData.dateRange[0].format("YYYY-MM-DD") +
        " " +
        submitData.timeRange[0].format("h:mm a"),
      "YYYY-MM-DD h:mm a",
    );
    let endtime = momentLocal(
      submitData.dateRange[1].format("YYYY-MM-DD") +
        " " +
        submitData.timeRange[1].format("h:mm a"),
      "YYYY-MM-DD h:mm a",
    );

    let inputdata = {
      usrId: submitData.userId,
      reason: submitData.reason,
      stDate: momentLocal(starttime).format("YYYY-MM-DD"),
      endDate: momentLocal(endtime).format("YYYY-MM-DD"),
      stTime: momentLocal(starttime).format("HH:mm"),
      endTime: momentLocal(endtime).format("HH:mm"),
      allDay: submitData.isAllDay,
    };

    if (props.data?.blockId) {
      AppointmentServices.UpdateAppointmentBlockOff(
        { blockId: props.data.blockId, ...inputdata },
        props.onSuccess,
      );
    } else {
      AppointmentServices.createAppointmentBlockOff(inputdata, props.onSuccess);
    }
  };

  // const updatePrimaryDoctor = (patientId) => {
  //     AppointmentServices.fetchPrimaryDoctor(patientId).then(response  => {
  //         let id = response.data.id;
  //         setRequiredInputData(k=>({...k,staffDetails:k.staffDetails.map(doctor => {
  //             if(doctor.userId === id){
  //                 return {...doctor , fullName: doctor.fullName+"(Primary)"};
  //             }
  //             else {
  //                 return doctor;
  //             }
  //         })}))

  //     } )
  // }

  return (
    <Modal
      className="blockOffModal"
      visible={true}
      title={(props.isEdit ? "Edit" : "Create") + " Block Off"}
      onCancel={props.onClose}
      footer={[
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button shape="round" block onClick={props.onClose}>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button block type="primary" shape="round" onClick={handleSubmit}>
              Save
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <>
        {" "}
        <Row style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Staff Member</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <Select
              showSearch={true}
              value={blockOffData.userId}
              filterOption={(input, option) =>
                option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                setBlockOffData((k) => ({ ...k, userId: value }));
              }}
              placeholder={<Text>Select a Staff Memeber</Text>}
              style={{ width: "100%" }}
            >
              {requiredInputData.staffDetails.map((k) => (
                <Option key={k.userId} value={k.userId} extra={k.fullName}>
                  <Row>
                    <Col>{k.fullName}</Col>
                  </Row>
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col span={24}>
            <Text>Block Off Reason</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <Input
              value={blockOffData.reason}
              onChange={(e) => {
                let value = e.target.value;
                setBlockOffData((k) => ({ ...k, reason: value }));
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col span={24}>
            <Text>Date</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <Col span={24}>
            <DatePicker.RangePicker
              value={blockOffData.dateRange}
              onChange={(d) => setBlockOffData((k) => ({ ...k, dateRange: d }))}
              format="MM/DD/YYYY"
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col span={24}>
            <Text>Time Range</Text>
          </Col>
        </Row>
        <Row gutter={[16, 0]} align="middle">
          <Col span={12}>
            <TimePicker.RangePicker
              value={blockOffData.timeRange}
              onChange={(d) => setBlockOffData((k) => ({ ...k, timeRange: d }))}
              style={{ width: "100%" }}
              use12Hours
              format="h:mm a"
              minuteStep={15}
              disabled={blockOffData.isAllDay}
            />{" "}
          </Col>
          <Col span={12}>
            <Checkbox
              checked={blockOffData.isAllDay}
              onChange={(d) => {
                let value = d.target.checked;
                setBlockOffData((k) => ({ ...k, isAllDay: value }));
              }}
              style={{ width: "100%" }}
            >
              All Day Event
            </Checkbox>
          </Col>
        </Row>
      </>
    </Modal>
  );
};
export default BlockOffModal;
