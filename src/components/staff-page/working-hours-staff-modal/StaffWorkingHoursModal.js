import React, { useState, useEffect } from "react";
import { Button, Checkbox, Col, Row, Typography, Modal } from "antd";
import "./StaffWorkingHoursModal.scss";
import CustomTimePicker from "../../generic-components/custom-time-picker/CustomTimePicker";
import { DAY_ORDER } from "./Constant";
import StaffServices from "../../../services/StaffServices";
import moment from "moment";
import DayHourSchedule from "./DayHourSchedule";
import { localToUtc, momentLocal, utcToLocal } from "../../util/TimeUtil";

const { Text } = Typography;

// const WORKING_DAYS_LIST = [{displayDay:"Su",value:"SUN",isSelected:false},
// {displayDay:"Mo",value:"Mon",isSelected:false},
// {displayDay:"Tu",value:"Tue",isSelected:false},
// {displayDay:"We",value:"Wed",isSelected:false},
// {displayDay:"Th",value:"Thur",isSelected:false},
// {displayDay:"Fr",value:"Fri",isSelected:false},
// {displayDay:"Sa",value:"Sat",isSelected:false}];

const StaffWorkingHoursModal = (props) => {
  let propsWorkingHours = props?.staffWorkingHrs?.workingHours ?? [];
  let propsExceptions = props?.staffWorkingHrs?.exceptions ?? [];

  const [days, setDays] = useState(
    propsWorkingHours.map((k) => ({
      day: k.workingDayCd,
      starttime: momentLocal(k.stTime, "hh:mm:ss").format("h:mma"),
      endtime: momentLocal(k.endTime, "hh:mm:ss").format("h:mma"),
      order: DAY_ORDER[k.workingDayCd],
    })),
  );

  const [lunchStarttime, setLunchStartTime] = useState();
  const [lunchEndtime, setLunchEndTime] = useState();
  const [lunchChecked, setLunchChecked] = useState(false);
  //const [applyToAll, setApplyToAll] = useState(false);
  //const [daysListObject,setDaysListObject] = useState([])
  // const [buttonColor, setButtonColor] = useState(
  //     [...WORKING_DAYS_LIST].map(x => ({...x,isSelected:propsWorkingHours.some(k => k.workingDayCd === x.value)}))
  //     );

  // const onClose = () => props.onClose();
  //const reference_array = ['SUN', 'MON', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

  //moment("11:00:00","hh:mm:ss").format("H:mma")

  useEffect(() => {
    if (propsExceptions.length > 0) {
      setLunchStartTime(
        momentLocal(propsExceptions[0].stTime, "hh:mm:ss").format("h:mma"),
      );
      setLunchEndTime(
        momentLocal(propsExceptions[0].endTime, "hh:mm:ss").format("h:mma"),
      );
      setLunchChecked(true);
    }
  }, []);

  const handleOk = () => {
    let exception = {
      stTime: momentLocal(lunchStarttime, "hh:mm a").format("HH:mm"),
      endTime: momentLocal(lunchEndtime, "hh:mm a").format("HH:mm"),
    };
    let exceptions = [];
    let workingHours = days.map((k) => {
      if (lunchChecked) {
        exceptions.push({ workingDayCd: k.day, ...exception });
      }

      return {
        workingDayCd: k.day,
        stTime: momentLocal(k.starttime, "hh:mm a").format("HH:mm"),
        endTime: momentLocal(k.endtime, "hh:mm a").format("HH:mm"),
      };
    });

    StaffServices.updateStaffWorkHours(
      { userId: props.userId, workingHours, exceptions },
      props.onSuccess,
    );
  };

  const onChange = (e) => {
    setLunchChecked(e.target.checked);
  };
  // const onApplyToAll = (isApplyToAll) => {
  //     setApplyToAll(isApplyToAll);
  //     let tempdays = [...days];
  //     tempdays.forEach(val => {
  //         val.starttime = tempdays[0].starttime;
  //         val.endtime = tempdays[0].endtime;

  // });
  // setDays(tempdays);
  // }

  // const onDayButtonClick = (value) => {
  //     let isAdd= ![...buttonColor].find(k=> k.value===value).isSelected;
  //     let newButtonColor = [...buttonColor].map(k=> k.value===value ?{...k,isSelected:!k.isSelected}:{...k});

  //     setButtonColor(newButtonColor);

  //     if (isAdd) {
  //         setDays(oldDays => [...oldDays, {day:value,starttime:null, endtime:null,order:DAY_ORDER[value]}]);
  //     } else {
  //         setDays(days=>days.filter(day=> day.day !== value));
  //     }
  //     // const sorted = [...days].sort((a, b) => reference_array.indexOf(a) - reference_array.indexOf(b));
  //     // console.log(sorted);
  //     // setDays(sorted);

  // };

  // const onDateChange = (day,timetype, time) => {
  //     let tempdays = [...days];
  //     let currentday = tempdays.find (k => k.day === day );
  //     currentday[timetype] = time;
  //     setDays(tempdays);
  // }
  const onTimeChange = (timetype, time) => {
    if (timetype === "starttime") {
      setLunchStartTime(time);
    } else {
      setLunchEndTime(time);
    }
    //console.log(lunchStarttime , lunchEndtime);
  };

  return (
    <Modal
      className="staff-working-hours-modal"
      title="Working Hours"
      visible={true}
      onOk={handleOk}
      onCancel={props.onClose}
      footer={[
        <Button size="large" shape="round" key="back" onClick={props.onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="large"
          shape="round"
          disabled={
            !(
              days.length > 0 &&
              days.every((k) => k.starttime && k.endtime) &&
              (lunchChecked ? lunchEndtime && lunchStarttime : true)
            )
          }
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <Text>Adjust {props.staffName}'s Working Hours</Text>
      <DayHourSchedule
        limitedTimeOnly={true}
        setDays={setDays}
        days={days}
        workingHours={propsWorkingHours}
      />
      {/* <Row
                 className='working-days'>
                {buttonColor.map(day => {
                    return (
                        <Col>
                            <Button
                                className={day.isSelected?
                                    'black-button' :
                                    'white-button'}
                                onClick={() => onDayButtonClick(day.value)}>
                                {day.displayDay}
                            </Button>
                        </Col>
                    )
                })}
            </Row>
            {days.sort((a,b)=>a.order-b.order).map((day, index) => {
                return (<Row justify='start'
                             gutter={[24, 24]}
                             className='time-range'>
                        <Col span={3}>
                            <div>{day.day}</div>
                        </Col>
                        <Col span={14}>
                            <CustomTimePicker applyToAll={applyToAll} starttime={day.starttime} endtime={day.endtime} onDateChange={(timetype,time) => onDateChange(day.day,timetype,time)}/>
                        </Col>
                        {index === 0 ?
                            <Col span={7}>
                                <Button
                                    size="small"
                                    className='apply-to-all'
                                    onClick={() => onApplyToAll(true)}>
                                    <FileOutlined/>
                                    Apply to All
                                </Button>
                            </Col> :
                            null}
                    </Row>
                )
            })} */}
      {days.length >= 1 ? (
        <Row>
          <Col span={24} style={{ marginBottom: 20 }}>
            <Checkbox
              checked={lunchChecked}
              onChange={onChange}
              className="text-default-400 font-size-13"
            >
              Add Lunch Break
            </Checkbox>
          </Col>
          {lunchChecked ? (
            <Col span={24}>
              <Row>
                <Col span={3}>
                  <div>Lunch</div>
                </Col>
                <Col span={14}>
                  <CustomTimePicker
                    limitedTimeOnly={true}
                    starttime={lunchStarttime}
                    endtime={lunchEndtime}
                    onDateChange={(timetype, time) =>
                      onTimeChange(timetype, time)
                    }
                  />
                </Col>
              </Row>
            </Col>
          ) : null}
        </Row>
      ) : null}
    </Modal>
  );
};
export default StaffWorkingHoursModal;
