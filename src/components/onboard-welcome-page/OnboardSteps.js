import React, { useEffect, useState } from "react";
import "./OnboardPage.scss";
import { Button, Col, Form, Row, Steps, Input, Typography, Upload } from "antd";

import loginimage from "../login/loginimage.jpg";
import { CheckCircleOutlined } from "@ant-design/icons";
import DayHourSchedule from "../staff-page/working-hours-staff-modal/DayHourSchedule";
import { momentLocal } from "../util/TimeUtil";
import { DAY_ORDER } from "../staff-page/working-hours-staff-modal/Constant";
import moment from "moment";
import { HeaderLogo, UploadIcon } from "../util/SvgUtil";
import "../login/LoginPage.scss";
import FormComponents from "../generic-components/form-components/FormComponents";
import NewUploadModal from "../appointment-details/upload/NewUploadModal";
import Dragger from "antd/lib/upload/Dragger";

const { Step } = Steps;
const { Text, Title } = Typography;
const ClinicInfo = () => {
  const formConfig = [
    {
      mainLabel: "Your Clinic Information",
      formFields: [
        {
          label: "Clinic Name",
          type: "input",
          span: 24,
          placeholder: "Enter Clinic Name",
          name: "clinicName",
        },
        {
          label: "Clinic Address",
          type: "input",
          span: 24,
          placeholder: "Enter Clinic Address",
          name: "clinicAddress",
        },
        {
          label: "Apt/Suite/Unit",
          type: "input",
          span: 12,
          placeholder: "Enter Apt/Suite/Unit",
          name: "apt",
        },
        {
          label: "City",
          type: "input",
          span: 12,
          placeholder: "Enter City",
          name: "city",
        },
        {
          label: "State",
          type: "input",
          span: 12,
          placeholder: "Enter Apt/Suite/Unit",
          name: "state",
        },
        {
          label: "Zip",
          type: "input",
          span: 12,
          placeholder: "Enter City",
          name: "zip",
        },
        {
          label: "Clinic Phone",
          type: "phone",
          span: 12,
          placeholder: "Enter Clinic Phone",
          name: "phone",
        },
        {
          label: "Email",
          type: "input",
          span: 12,
          placeholder: "Enter Email",
          name: "email",
        },
      ],
    },
  ];

  return (
    <>
      {formConfig.map((config, index) => {
        return (
          <>
            <Row style={{ marginBottom: 24 }}>
              <Col span={24}>
                <Text strong className="text-default-500 font-size-16">
                  {config && config.mainLabel}
                </Text>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              {config.formFields.map((field, index) => {
                return FormComponents.getFormItem(field, false);
              })}
            </Row>
          </>
        );
      })}
    </>
  );
};

const HourInfo = () => {
  const FormDaySchedule = ({ value = [], onChange }) => {
    let days = value.map((k) => ({
      day: k.workingDayCd,
      starttime: k.stTime
        ? moment(k.stTime, "hh:mm:ss").format("hh:mma")
        : null,
      endtime: k.endTime
        ? moment(k.endTime, "hh:mm:ss").format("hh:mma")
        : null,
      order: DAY_ORDER[k.workingDayCd],
    }));

    const setDays = (input) => {
      onChange(
        input.map((k) => {
          return {
            workingDayCd: k.day,
            stTime: k.starttime
              ? moment(k.starttime, "hh:mm a").format("HH:mm")
              : null,
            endTime: k.endtime
              ? moment(k.endtime, "hh:mm a").format("HH:mm")
              : null,
          };
        }),
      );
    };

    return (
      <>
        <Row style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Text strong className="text-default-500 font-size-16">
              When are you open?
            </Text>
          </Col>
        </Row>
        <DayHourSchedule
          days={days}
          limitedTimeOnly={false}
          setDays={setDays}
          workingHours={value}
        />
      </>
    );
  };

  return (
    <Row>
      <Col span={24}>
        <Form.Item name="workingHours">
          <FormDaySchedule />
        </Form.Item>
      </Col>
    </Row>
  );
};

const UploadInfo = () => {
  return (
    <>
      <Row style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Text strong className="text-default-500 font-size-16">
            Upload your Clinic Data
          </Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Dragger style={{ padding: "30px" }}>
            <UploadIcon style={{ fontSize: "4em" }} />
            <p className="ant-upload-text">Drop your files here, or browse</p>
            <p className="ant-upload-hint">Support JPG,PNG and PDF</p>
          </Dragger>
        </Col>
      </Row>
    </>
  );
};

const CompleteInfo = () => {
  return (
    <>
      <Row justify="center">
        <Col>
          <div
            style={{ marginTop: "20px" }}
            align="center"
            className="success-pay-checkmark"
          >
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <div align="center" className="paymentStatusText">
            <span>Setup Complete</span>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text strong className=" text-default-500">
            We’ve received your account data and are
          </Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col>
          <Text className=" text-default-500" strong>
            processing it.
          </Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col>
          <Text strong>
            We will send you an email once this process has completed.
          </Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text>If you have any questions feel free to reach out to us at</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text> support@whskr.com</Text>
        </Col>
      </Row>
    </>
  );
};

export { ClinicInfo, HourInfo, UploadInfo, CompleteInfo };
