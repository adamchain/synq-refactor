import React, { useState, useEffect, useContext } from "react";
import { Modal, Steps, Button, Spin, Space, Row, Col } from "antd";

import CreateApptStep1 from "./CreateApptStep1";
import CreateApptStep2 from "./CreateApptStep2";
import CreateApptStep3 from "./CreateApptStep3";
import "./AppointmentModal.scss";
import CommonUtil from "./../util/CommonUtil";
import AppointmentServices from "./../../services/AppointmentServices";
import PatientServices from "../../services/PatientServices";
import CustomSpinner from "../generic-components/customSpinner/CustomSpinner";
import { localToUtc, momentLocal, utcToLocal } from "../util/TimeUtil";
import moment from "moment";
import { CommonContext } from "../../context/CommonContext";

const { Step } = Steps;

const AppointmentModals = (props) => {
  const [requiredInputData, setRequiredInputData] = useState({
    doctorDetails: [],
    patientDetails: [],
  });
  const [current, setCurrent] = useState(0);
  const commonContext = useContext(CommonContext);
  const [step1Data, setStep1Data] = useState({
    patientId: null,
    appointmentType: "",
    appointmentLength: "",
    isDropOffAppointment: false,
  });
  const [step2Data, setStep2Data] = useState({
    providerId: null,
    appointmentDate: momentLocal(),
    appointmentTime: "",
  });
  const [step3Data, setStep3Data] = useState({
    notes: "",
    repeatType: "No Repeat",
    repeatDays: [],
    endDate: momentLocal(),
  });

  const refetchPatientDetails = () => {
    PatientServices.fetchAllPatients((data) =>
      setRequiredInputData((k) => ({ ...k, patientDetails: data })),
    );
  };

  useEffect(() => {
    refetchPatientDetails();
    AppointmentServices.fetchAllVets((data) =>
      setRequiredInputData((k) => ({ ...k, doctorDetails: data })),
    );
    //let doctorDetails = allStaff.filter(e => !e.role.includes("FRONTDESK"));
    //let doctorDetails = [{id:1,name:"Dr. Carla Politte(Primary)"},{id:2,name:"Dr. Joseph Bryan"}];
    //setRequiredInputData(k=>({...k,patientDetails,doctorDetails}));
  }, []);

  useEffect(() => {
    let inputData = props.appointmentData;
    if (inputData) {
      setStep1Data({
        patientId: inputData.patientId,
        appointmentType: inputData.apptTypeId,
        appointmentLength: inputData.duration,
        isDropOffAppointment: inputData.dropOff === "Y",
      });
      setStep2Data({
        providerId: inputData.providerId,
        appointmentDate: utcToLocal(inputData.stTime, "YYYY-MM-DDTHH:mm"),
        appointmentTime: utcToLocal(inputData.stTime, "YYYY-MM-DDTHH:mm")
          .toString()
          .split("T")[1]
          .slice(0, 5),
      });
      setStep3Data({
        notes: inputData.notes,
        repeatType: "No Repeat",
        repeatDays: [],
        endDate: momentLocal(),
      });
    }
    if (props.optionalData) {
      setStep1Data({ patientId: props.optionalData.patientId });
    }
  }, [props.appointmentData]);
  const updatePrimaryDoctor = (patientId) => {
    AppointmentServices.fetchPrimaryDoctor(patientId).then((response) => {
      let id = response.data.id;
      setRequiredInputData((k) => ({
        ...k,
        doctorDetails: k.doctorDetails.map((doctor) => {
          if (doctor.userId === id) {
            return { ...doctor, fullName: doctor.fullName + "(Primary)" };
          } else {
            return doctor;
          }
        }),
      }));
    });
  };

  function getFormattedTime(appointmentDate, appointmentTime) {
    try {
      // Ensure `appointmentDate` is a valid Date object or Moment object
      const isMomentDate = moment.isMoment(appointmentDate);
      const parsedDate = isMomentDate
        ? appointmentDate.toDate()
        : new Date(appointmentDate);

      // Safari-specific handling
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid Date provided");
      }

      // Ensure `appointmentTime` is properly formatted
      const timeParts = appointmentTime.split(/[: ]/);
      const isPM = appointmentTime.includes("PM");
      let hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      if (isPM && hours < 12) hours += 12; // Convert PM to 24-hour format
      if (!isPM && hours === 12) hours = 0; // Handle 12 AM edge case

      parsedDate.setHours(hours, minutes, 0, 0);

      // Return in the required format
      return parsedDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    } catch (error) {
      console.error("Date parsing failed:", error);
      return null; // Return null in case of failure
    }
  }

  const steps = [
    {
      description: "Setup",
      title: "Setup",
      content: (
        <CreateApptStep1
          refetchPatientDetails={refetchPatientDetails}
          patientDetails={requiredInputData.patientDetails}
          appointmentData={step1Data}
          setAppointmentData={setStep1Data}
          updatePrimaryDoctor={updatePrimaryDoctor}
        />
      ),
    },
    {
      title: "Date/Time",
      content: (
        <CreateApptStep2
          doctorDetails={requiredInputData.doctorDetails}
          appointmentData={step2Data}
          setAppointmentData={setStep2Data}
          step1Data={step1Data}
        />
      ),
    },
    {
      title: "Finish",
      content: (
        <CreateApptStep3
          appointmentData={step3Data}
          setAppointmentData={setStep3Data}
        />
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const isNextDisabled = (value) => {
    return value === 0
      ? !CommonUtil.isAllValuesFilled(step1Data)
      : value === 1
        ? !CommonUtil.isAllValuesFilled(step2Data)
        : !CommonUtil.isAllValuesFilled(step3Data);
  };
  return (
    <Modal
      visible={true}
      title={(props.isEdit ? "Edit" : "Create") + " Appointment"}
      footer={[
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button
              shape="round"
              block
              onClick={() => (current > 0 ? prev() : props.onClose())}
            >
              {current > 0 ? "Back" : "Cancel"}
            </Button>
          </Col>
          <Col span={12}>
            {current < steps.length - 1 && (
              <Button
                block
                type="primary"
                shape="round"
                disabled={isNextDisabled(current)}
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                block
                type="primary"
                shape="round"
                onClick={() => {
                  //moment('2021-01-27 10:30 PM').format("YYYY-MM-DD HH:mm");
                  //step2Data.appointmentDate.toISOString().split("T")[0] +" 10:30 AM"
                  let inputJson = {
                    patientId: step1Data.patientId,
                    providerId: step2Data.providerId,
                    apptTypeId: step1Data.appointmentType,
                    //stTime:localToUtc(momentLocal(step2Data.appointmentDate.toISOString().split("T")[0] + " " + step2Data.appointmentTime)).format("YYYY-MM-DDTHH:mm"),
                    //"stTime" : "2021-04-01T16:15",
                    stTime: getFormattedTime(
                      step2Data.appointmentDate,
                      step2Data.appointmentTime,
                    ),
                    duration: step1Data.appointmentLength,
                    dropOff: step1Data.isDropOffAppointment ? "true" : "false",
                    notes: step3Data.notes,
                    apptStatusId: 1,
                    branchId: commonContext?.defaultBranch?.branchId,
                    orgId: commonContext?.defaultBranch?.orgId,
                  };
                  if (props.isEdit) {
                    inputJson.apptStatusId = props.appointmentData.apptStatusId;
                    inputJson.apptId = props.appointmentData.apptId;
                    AppointmentServices.updateAppointment(
                      inputJson,
                      props.onSuccessReturn,
                    );
                    props.onClose();
                  } else {
                    AppointmentServices.createAppointment(
                      inputJson,
                      props.onSuccessReturn,
                    );
                    props.onClose();
                  }
                }}
              >
                Save & Exit
              </Button>
            )}
          </Col>
        </Row>,
      ]}
      width={400}
      onCancel={() => props.onClose()}
      className="appt-modal"
    >
      <Steps
        size="small"
        current={current}
        labelPlacement="vertical"
        style={{ marginBottom: "16px" }}
      >
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Row>
        <Col span={24}>
          <div className="steps-content">{steps[current].content}</div>
        </Col>
      </Row>
    </Modal>
  );
};
export default AppointmentModals;
