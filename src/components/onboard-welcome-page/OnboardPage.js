import React, { useEffect, useState } from "react";
import "./OnboardPage.scss";
import { Button, Col, Form, Row, Steps, Input, Typography, Card } from "antd";

import loginimage from "../login/loginimage.jpg";
import { CheckCircleOutlined } from "@ant-design/icons";
import DayHourSchedule from "../staff-page/working-hours-staff-modal/DayHourSchedule";
import { momentLocal } from "../util/TimeUtil";
import { DAY_ORDER } from "../staff-page/working-hours-staff-modal/Constant";
import moment from "moment";
import { HeaderLogo } from "../util/SvgUtil";
import "../login/LoginPage.scss";
import {
  ClinicInfo,
  CompleteInfo,
  HourInfo,
  UploadInfo,
} from "../onboard-welcome-page/OnboardSteps";
import { LoginOutlined, RightCircleOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Text, Title } = Typography;

const OnboardPage = () => {
  const formItemLayout = {
    labelCol: {
      sm: {
        span: 24,
      },
    },
    wrapperCol: {
      sm: {
        span: 24,
      },
    },
  };
  const clinicLists = [
    {
      name: "Trusted Friend Animal Clinic",
      address: "5975 Roswell Rd, Sandy Springs, GA 30328 ",
    },
    {
      name: "Trusted Friend Animal Clinic",
      address: "5975 Roswell Rd, Sandy Springs, GA 30328 ",
    },
  ];

  const [form] = Form.useForm();

  const [current, setCurrent] = useState(null);

  const [pageType, setPageType] = useState("Clinic");

  const steps = [
    {
      description: "Setup",
      title: "Clinic",
      content: <ClinicInfo />,
    },
    {
      title: "Hours",
      content: <HourInfo />,
    },
    {
      title: "Upload",
      content: <UploadInfo />,
    },
  ];

  const BeginSetup = () => {
    return (
      <>
        <Row justify="start">
          <Text strong className="text-default-600 welcome-name">
            Welcome Carla!
          </Text>
        </Row>

        <Row justify="start" style={{ marginBottom: "10px" }}>
          <Text strong className="text-default-400 font-size-20">
            It’s time to setup your account. Woot woot!
          </Text>
        </Row>
        <Row justify="start" style={{ marginBottom: "32px" }}>
          <Text className="text-default-400 font-size-16">
            Have the following pieces of information handy to make this setup
            process a breeze:
          </Text>
        </Row>

        <Row gutter={[20, 0]} align="middle" style={{ marginBottom: "32px" }}>
          <Col>
            <RightCircleOutlined className="text-default-500" />
          </Col>
          <Col>
            <Row>
              <Col>
                <Text strong className="text-default-400 font-size-20">
                  Your Clinic Information
                </Text>
              </Col>
            </Row>
            <Row>
              <Col>Including the address, phone number and hours</Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[20, 0]} align="middle" style={{ marginBottom: "32px" }}>
          <Col>
            <RightCircleOutlined className="text-default-500" />
          </Col>
          <Col>
            <Row>
              <Col>
                <Text strong className="text-default-400 font-size-20">
                  Your Clinic Data
                </Text>
              </Col>
            </Row>
            <Row>
              <Col>Usually an Excel, CSV or Zip file.</Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  useEffect(() => {
    if (current === 0) {
      setPageType("Clinic");
    } else if (current === 1) {
      setPageType("Hours");
    } else if (current === 2) {
      setPageType("Upload");
    }
  }, [current]);

  return (
    <Row className="login-layout">
      <Col span={24} xs={24} xl={12} xxl={10} className="login-side">
        <Card bordered={false} className="login-shrinkwrap">
          <HeaderLogo height="120px" />
          {current === null ? (
            pageType === "Upload" ? (
              <CompleteInfo />
            ) : (
              <BeginSetup />
            )
          ) : (
            <>
              <Steps
                size="default"
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
                  <Form
                    onValuesChange={(value) => {}}
                    form={form}
                    layout="vertical"
                    id="onboard-form-id"
                    name="normal_login"
                    initialValues={{
                      workingHours: ["Mon", "Tue", "Wed", "Thu", "Fri"].map(
                        (k) => ({
                          endTime: null,
                          stTime: null,
                          workingDayCd: k,
                        }),
                      ),
                    }}
                    onFinish={() => {}}
                  >
                    {steps[current].content}
                  </Form>
                </Col>
              </Row>
            </>
          )}

          <Row justify="space-between">
            {current === null ? (
              pageType !== "Upload" && (
                <Col span={24}>
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    form="login-form-id"
                    block
                    className="login-form-button"
                    onClick={() => {
                      setCurrent(0);
                    }}
                  >
                    Begin Setup
                  </Button>
                </Col>
              )
            ) : (
              <>
                {" "}
                <Col span={10}>
                  <Button
                    type="default"
                    size="large"
                    shape="round"
                    form="login-form-id"
                    block
                    className="login-form-button"
                    onClick={() => setCurrent((k) => k - 1)}
                  >
                    Back
                  </Button>
                </Col>
                <Col span={10}>
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    form="login-form-id"
                    block
                    className="login-form-button"
                    onClick={() =>
                      setCurrent((k) => (k + 1 > 2 ? null : k + 1))
                    }
                  >
                    {current === 2 ? "Complete" : "Next"}
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Card>
      </Col>
      <Col xs={24} xl={12} xxl={14}>
        <div
          style={{ backgroundImage: `url(${loginimage})` }}
          className="heroLogin"
        >
          <div className="heroLock"></div>
        </div>
      </Col>
    </Row>
  );
};

export default OnboardPage;
