import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "antd";
import { DuplicateIcon } from "../../util/SvgUtil";
import CustomTimePicker from "../../generic-components/custom-time-picker/CustomTimePicker";
import { DAY_ORDER } from "./Constant";
import "./StaffWorkingHoursModal.scss";
import { capitalize } from "lodash-es";
import { OmitProps } from "antd/lib/transfer/ListBody";

const WORKING_DAYS_LIST = [
  { displayDay: "Su", value: "Sun", isSelected: false },
  { displayDay: "Mo", value: "Mon", isSelected: false },
  { displayDay: "Tu", value: "Tue", isSelected: false },
  { displayDay: "We", value: "Wed", isSelected: false },
  { displayDay: "Th", value: "Thu", isSelected: false },
  { displayDay: "Fr", value: "Fri", isSelected: false },
  { displayDay: "Sa", value: "Sat", isSelected: false },
];

const DayHourSchedule = ({ workingHours, setDays, days, limitedTimeOnly }) => {
  const [buttonColor, setButtonColor] = useState([]);

  useEffect(() => {
    setButtonColor(
      [...WORKING_DAYS_LIST].map((x) => ({
        ...x,
        isSelected: workingHours.some((k) => k.workingDayCd === x.value),
      })),
    );
  }, [workingHours]);
  const [applyToAll, setApplyToAll] = useState(false);

  const onDateChange = (day, timetype, time) => {
    let tempdays = [...days];
    let currentday = tempdays.find((k) => k.day === day);
    currentday[timetype] = time;
    setDays(tempdays);
  };

  const onDayButtonClick = (value) => {
    let isAdd = ![...buttonColor].find((k) => k.value === value).isSelected;
    let newButtonColor = [...buttonColor].map((k) =>
      k.value === value ? { ...k, isSelected: !k.isSelected } : { ...k },
    );

    setButtonColor(newButtonColor);

    if (isAdd) {
      setDays([
        ...days,
        { day: value, starttime: null, endtime: null, order: DAY_ORDER[value] },
      ]);
    } else {
      setDays(days.filter((day) => day.day !== value));
    }
    // const sorted = [...days].sort((a, b) => reference_array.indexOf(a) - reference_array.indexOf(b));
    // console.log(sorted);
    // setDays(sorted);
  };
  const onApplyToAll = (isApplyToAll) => {
    setApplyToAll(isApplyToAll);
    let tempdays = [...days];
    tempdays.forEach((val) => {
      val.starttime = tempdays[0].starttime;
      val.endtime = tempdays[0].endtime;
    });
    setDays(tempdays);
  };
  return (
    <>
      <Row className="working-days">
        {buttonColor.map((day) => {
          return (
            <Col>
              <Button
                className={day.isSelected ? "black-button" : "white-button"}
                onClick={() => onDayButtonClick(day.value)}
              >
                {day.displayDay}
              </Button>
            </Col>
          );
        })}
      </Row>
      {days
        .sort((a, b) => a.order - b.order)
        .map((day, index) => {
          return (
            <Row
              justify="start"
              style={{ marginBottom: 24 }}
              gutter={[24, 24]}
              className="time-range"
            >
              <Col style={{ paddingTop: 6, textAlign: "left", minWidth: 70 }}>
                <div>{day.day}</div>
              </Col>
              <Col>
                <CustomTimePicker
                  limitedTimeOnly={limitedTimeOnly}
                  applyToAll={applyToAll}
                  starttime={day.starttime}
                  endtime={day.endtime}
                  onDateChange={(timetype, time) =>
                    onDateChange(day.day, timetype, time)
                  }
                />
              </Col>
              {index === 0 ? (
                <Col style={{ padding: 0 }}>
                  <Button
                    size="small"
                    type="link"
                    className="apply-to-all"
                    icon={<DuplicateIcon />}
                    onClick={() => onApplyToAll(true)}
                  >
                    Apply to All
                  </Button>
                </Col>
              ) : null}
            </Row>
          );
        })}
    </>
  );
};

export default DayHourSchedule;
