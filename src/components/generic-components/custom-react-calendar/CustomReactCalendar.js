import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomReactCalendar.scss";

const CustomReactCalendar = (props) => {
  return <Calendar {...props} />;
};

export default CustomReactCalendar;
