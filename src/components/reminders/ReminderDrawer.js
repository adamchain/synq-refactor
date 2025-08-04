import React, { useState, useEffect } from "react";
import { Button, Drawer, Form } from "antd";

import ReminderForm from "./ReminderForm";
import "./Reminder.scss";
import moment from "moment";
import PatientServices from "./../../services/PatientServices";
import StaffServices from "./../../services/StaffServices";
import ReminderServices from "./../../services/ReminderServices";
import { momentLocal } from "../util/TimeUtil";

let weekObject = {
  1: "First ",
  2: "Second ",
  3: "Third ",
  4: "Fourth ",
  5: "Last ",
};
let dayObject = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const populateOnDay = (updatedDate) => {
  let day = updatedDate.day();
  let date = updatedDate.date();
  let nthOfMoth = Math.ceil(updatedDate.date() / 7);
  return [
    { name: "Day " + date, value: date },
    {
      name: weekObject[nthOfMoth] + dayObject[day],
      value: "on" + dayObject[day] + "-" + nthOfMoth,
    },
  ];
};
const ReminderDrawer = (props) => {
  const [form] = Form.useForm();
  const [requiredInputs, setRequiredInputs] = useState({
    onDayList: [],
    patientList: [],
    staffList: [],
    repeat: { type: "DNR", repeatEnds: "O" },
    isShowRelatingToPatient: true,
  });

  useEffect(() => {
    PatientServices.fetchAllPatients((data) =>
      setRequiredInputs((k) => ({ ...k, patientList: data })),
    );
    StaffServices.fetchStaff((data) =>
      setRequiredInputs((k) => ({
        ...k,
        staffList: data.map((v) => ({
          ...v,
          displayName: v.firstName + " " + v.lastName,
        })),
      })),
    );

    if (props.data && props.isEdit) {
      let formData = { ...props.data };
      let tempRepeat = { type: "DNR", repeatEnds: "N" };
      let days = [];
      let repeat = formData.repeat ?? {};
      if (repeat.type) {
        tempRepeat.interval = repeat.interval;
        tempRepeat.type = repeat.type;

        if (repeat.endDate) {
          tempRepeat.endDate = momentLocal(repeat.endDate);
          tempRepeat.repeatEnds = "O";
        } else if (repeat.maxRepeat) {
          tempRepeat.maxRepeat = repeat.maxRepeat;
          tempRepeat.repeatEnds = "A";
        }

        if (repeat.type === "M") {
          if (repeat.onWeek || repeat.onLastWeek) {
            let week = repeat.onLastWeek ? 5 : repeat.onWeek;
            let day = Object.values(dayObject).find((k) => repeat["on" + k]);
            tempRepeat.onDay = "on" + day + "-" + week;
            setRequiredInputs((k) => ({
              ...k,
              onDayList: [
                { name: weekObject[week] + " " + day, value: tempRepeat.onDay },
              ],
            }));
          }
          if (repeat.onDay) {
            tempRepeat.onDay = repeat.onDay;
            setRequiredInputs((k) => ({
              ...k,
              onDayList: [{ name: "Day " + repeat.onDay, value: repeat.onDay }],
            }));
          }
        }

        if (repeat.type === "W") {
          days = Object.values(dayObject)
            .filter((k) => repeat["on" + k])
            .map((k) => "on" + k);
        }
      }

      formData.days = days;
      formData.repeat = tempRepeat;
      setRequiredInputs((k) => ({
        ...k,
        repeat: { type: tempRepeat.type, repeatEnds: tempRepeat.repeatEnds },
      }));
      form.setFieldsValue({
        ...formData,
        reminderDate: momentLocal(props.data.reminderDate, "YYYY-MM-DD"),
      });
      onFormValueChange({ reminderType: formData.reminderType });
    } else {
      setRequiredInputs((k) => ({
        ...k,
        onDayList: populateOnDay(momentLocal()),
      }));
      onFormValueChange({ reminderType: props.isToDo ? 3 : null });
      form.setFieldsValue({
        patientId: props.data?.patientId,
        reminderDate: momentLocal(),
        days: [],
        repeat: { type: "DNR", repeatEnds: "O" },
      });
    }
  }, [props.data]);

  const onClose = () => props.onClose();
  const handleSubmit = (submitData) => {
    let finalData = { ...submitData };
    let reminderDate = (submitData.reminderDate ?? momentLocal()).format(
      "YYYY-MM-DD",
    );

    if (submitData.repeat.type === "DNR") {
      delete finalData.repeat;
    } else {
      if (submitData.repeat.type === "W") {
        finalData.days.forEach((k) => {
          submitData.repeat[k] = true;
        });

        delete finalData.days;
      }
      if (submitData.repeat.type === "M") {
        let onDay = submitData.repeat.onDay ?? "";
        if (Number.isNaN(onDay) && onDay.includes("-")) {
          finalData.repeat[onDay.split("-")[0]] = true;
          if (onDay.split("-")[1] === 5) {
            finalData.repeat.onLastWeek = true;
          } else {
            finalData.repeat.onWeek = onDay.split("-")[1];
          }
          delete finalData.repeat.onDay;
        } else {
          delete finalData.repeat.onDay;
        }
      }

      if (submitData.repeat.repeatEnds !== "N") {
        if (submitData.repeat.repeatEnds === "O") {
          let endDate = (submitData.repeat.endDate ?? moment()).format(
            "YYYY-MM-DD",
          );
          finalData.repeat.endDate = endDate;
        }
      }
      delete finalData.repeat.repeatEnds;
    }
    finalData.reminderDate = reminderDate;

    if (props.isToDo) {
      finalData.reminderType = 3;
    }
    if (props.isEdit) {
      ReminderServices.updateReminder(
        { ...finalData, id: props.data.id },
        () => {
          onClose();
          props.onSuccess();
        },
      );
    } else {
      ReminderServices.createReminder(finalData, () => {
        onClose();
        props.onSuccess();
      });
    }

    //alert(JSON.stringify(finalData));
  };

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    switch (key) {
      case "repeat":
        let repeatObject = formValue.repeat;
        setRequiredInputs((k) => ({
          ...k,
          repeat: { ...k.repeat, ...repeatObject },
        }));
        break;

      case "reminderDate":
        setRequiredInputs((k) => ({
          ...k,
          onDayList: populateOnDay(formValue[key]),
        }));
        break;

      case "reminderType":
        setRequiredInputs((k) => ({
          ...k,
          isShowRelatingToPatient: formValue[key] !== 3,
        }));
        break;
    }
  };
  return (
    <Drawer
      className="print-label-drawer"
      title={
        (props.isEdit ? "Edit" : "Add") +
        (props.isToDo ? " To-Do" : " Reminder")
      }
      width={492}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          <Button
            onClick={onClose}
            shape="round"
            size="large"
            style={{ marginRight: 16 }}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            form="reminder-form-id"
            type="primary"
            size="large"
            shape="round"
          >
            {(props.isEdit ? "Save" : "Add") + (props.isToDo ? "" : "")}
          </Button>
        </div>
      }
    >
      <ReminderForm
        reminderform={form}
        patientName={props.patientName}
        handleSubmit={handleSubmit}
        onFormValueChange={onFormValueChange}
        formInputData={{
          ...requiredInputs,
          patientId: props.data?.patientId,
          isToDo: props.isToDo,
        }}
      />
    </Drawer>
  );
};
export default ReminderDrawer;
