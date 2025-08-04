import "./CustomTimePicker.scss";
import { Select } from "antd";
import React, { useContext, useState } from "react";
import { Option } from "antd/es/mentions";
import Text from "antd/es/typography/Text";
import { momentLocal } from "../../util/TimeUtil";
import { CommonContext } from "../../../context/CommonContext";

// const getTimeIntervals = () => {
//     let minutesInterval = 30;
//     let times = [];
//     let startTime = 0;
//     const meridiem = ['am', 'pm'];
//     for (let i=0; startTime<24*60; i++) {
//         const hh = Math.floor(startTime/60);
//         const mm = (startTime%60);
//         times[i] = ('0' + (hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2) + meridiem[Math.floor(hh/12)];
//         startTime = startTime + minutesInterval;
//     }
//     return (times)
// }

const getTimeIntervals = (isAfter, isBefore, doCheck) => {
  const hours = [];
  for (let hour = 0; hour < 24; hour++) {
    hours.push(momentLocal({ hour }));
    hours.push(
      momentLocal({
        hour,
        minute: 30,
      }),
    );
  }
  return hours
    .filter((k) =>
      doCheck ? k.isSameOrAfter(isAfter) && k.isSameOrBefore(isBefore) : true,
    )
    .map((k) => k.format("h:mma"));
};

const CustomTimePicker = (props) => {
  const commonContext = useContext(CommonContext);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  let isAfter = commonContext.defaultBranch?.stTime
    ? momentLocal(commonContext.defaultBranch.stTime, "hh:mm:ss")
    : momentLocal().startOf("day");
  let isBefore = commonContext.defaultBranch?.endTime
    ? momentLocal(commonContext.defaultBranch.endTime, "hh:mm:ss")
    : momentLocal().startOf("day");
  const startTimeChange = (value) => {
    setSelectedStartTime(value);
  };
  const endTimeChange = (value) => {
    setSelectedEndTime(value);
  };

  return (
    <div className="custom-time-range">
      <Select
        style={{ width: 110 }}
        bordered={false}
        showSearch={true}
        value={props.starttime}
        onChange={(value) => props.onDateChange("starttime", value)}
        placeholder={<Text>Start Time</Text>}
      >
        {getTimeIntervals(isAfter, isBefore, props.limitedTimeOnly).map(
          (option) => {
            return <Option value={option}>{option}</Option>;
          },
        )}
      </Select>
      <span>to</span>
      <Select
        showSearch={true}
        style={{ width: 110 }}
        bordered={false}
        value={props.endtime}
        onChange={(value) => props.onDateChange("endtime", value)}
        placeholder={<Text>End Time</Text>}
      >
        {getTimeIntervals(isAfter, isBefore, props.limitedTimeOnly).map(
          (option) => {
            return <Option value={option}>{option}</Option>;
          },
        )}
      </Select>
    </div>
  );
};
export default CustomTimePicker;
