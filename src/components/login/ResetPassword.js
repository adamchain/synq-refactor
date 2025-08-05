import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import "./LoginPage.scss";
import LoginServices from "../../services/LoginServices";
import axios from "axios";

const { Title, Text, Paragraph, Link } = Typography;
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

const ResetPassword = (props) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const history = useHistory();

  const [pageType, setPageType] = useState(
    props.subType ? props.subType : "sent-instruction",
  );

  return (
    <>
      {pageType === "sent-instruction" && (
        <>
          <Title style={{ marginBottom: 24 }} level={3}>
            Reset Password
          </Title>

          <Paragraph style={{ marginBottom: "2em" }}>
            Enter the email associated with your account and we'll send
            instructions on how to reset your password.
          </Paragraph>
          <Form
            // onValuesChange ={(value)=>onFormValueChange(value)}
            form={form}
            layout="vertical"
            id="reset-pwd-form-id"
            name="normal_login"
            {...formItemLayout}
            initialValues={{
              remember: true,
              validationVariable: "",
            }}
            onFinish={(values) => {
              LoginServices.initiateResetPassword(values.email, () => {
                //TODO success or failure check
                setPageType("instruction-success");
              });
            }}
          >
            <Form.Item
              label={<Text className="login-label">Email Address</Text>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "An valid email required to Login",
                },
                // {
                //     validateTrigger:"onChange",
                //     validator: async (rule, value) => {
                //         if(form.getFieldValue("validationVariable").includes("wrong-usn")){
                //         throw new Error('An valid email required to Login');
                //         }
                //       }

                // }
              ]}
            >
              <Input
                placeholder="doctor@clinic.com"
                size="large"
                type="email"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              shape="round"
              form="reset-pwd-form-id"
              block
              className="login-form-button"
              //onClick={() => setPageType("password")}
            >
              Send Instructions
            </Button>
            <Button
              type="secondary"
              size="large"
              shape="round"
              block
              className="login-form-button"
              onClick={() => (window.location.href = "/login")}
              //onClick={() => setPageType("password")}
            >
              Cancel
            </Button>
            <Form.Item hidden={true} name="validationVariable">
              <Input type="hidden" />
            </Form.Item>

            {/* <Space direction="vertical">

                                        <Text className="login-label">

                                            Don't have an account? <a href="">Sign Up</a>

                                        </Text>

                                    </Space> */}
          </Form>
        </>
      )}
      {pageType === "instruction-success" && (
        <>
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
                  <Title level={3}>Check your email</Title>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col align="middle">
                  <Paragraph>
                    We have sent password reset instructions to your email
                    address
                  </Paragraph>
                </Col>
              </Row>
              <Row
                justify="center"
                align="middle"
                style={{ marginBottom: "2em" }}
              >
                <Col span={24}>
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    block
                    className="login-form-button"
                    onClick={() => props.changePage()}
                  >
                    Return to Login
                  </Button>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col align="middle">
                  <Paragraph>
                    Did not recieve the email? Make sure and check your spam
                    filter or{" "}
                    {
                      <Link onClick={() => setPageType("sent-instruction")}>
                        try a different email address{" "}
                      </Link>
                    }
                  </Paragraph>
                </Col>
              </Row>
              {/* <Row justify="center" align="middle" style={{marginBottom : "2em"}} ><Col span={24}>
            <Button
                                             type="primary"
                                             size="large"
                                             shape="round"
                                             block
                                            className="login-form-button"
                                            onClick={()=>setPageType("reset-pwd")}
                                           
                                            >

                                        TEst Reset Pwd
                                        </Button></Col></Row> */}
            </Col>
          </Row>
        </>
      )}

      {pageType === "reset-pwd" && (
        <>
          <Title style={{ marginBottom: 24 }} level={3}>
            {" "}
            {props.extra.createpass ? "Create Acount" : "Reset Password"}
          </Title>
          <Paragraph style={{ marginBottom: "2em" }}>
            Get access to your account by creating a password
          </Paragraph>
          <Form
            // onValuesChange ={(value)=>onFormValueChange(value)}
            form={form2}
            layout="vertical"
            id="reset-pwd-form-id-2"
            name="normal_login"
            {...formItemLayout}
            initialValues={{
              remember: true,
              validationVariable: "",
            }}
            onFinish={(values) => {
              LoginServices.resetPassword(
                values.pwd,
                props.extra.uuid,
                props.extra.token,
                () => {
                  //TODO success or failure check
                  setPageType("reset-success");
                },
              );
            }}
          >
            <Form.Item
              label={<Text className="login-label">Password</Text>}
              name="pwd"
              extra="Must be atleast 8 characters"
              rules={[
                {
                  required: true,
                  message: "A valid password required to Login",
                },
                {
                  validateTrigger: "onChange",
                  validator: async (rule, value) => {
                    if (value.length < 8) {
                      throw new Error(
                        "Password does not meet minimum requirements",
                      );
                    }
                  },
                },
              ]}
            >
              <Input type="password" size="large" />
            </Form.Item>

            <Form.Item
              label={<Text className="login-label">Confirm Password</Text>}
              name="confirmPwd"
              extra="Both passwords must match"
              rules={[
                {
                  required: true,
                  message: "A valid password required to Login",
                },
                {
                  validateTrigger: "onChange",
                  validator: async (rule, value) => {
                    if (form2.getFieldValue("pwd") !== value) {
                      throw new Error("Password does not match");
                    }
                  },
                },
              ]}
            >
              <Input type="password" size="large" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              shape="round"
              form="reset-pwd-form-id-2"
              block
              className="login-form-button"
              //onClick={() => setPageType("password")}
            >
              {props.extra.createpass ? "Create Account" : "Reset Password"}
            </Button>

            <Form.Item hidden={true} name="validationVariable">
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </>
      )}
      {pageType === "reset-success" && (
        <>
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
                  <Title level={3}>Password Reset!</Title>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col align="middle">
                  <Paragraph>
                    Your password was succesfully reset. Please return to the
                    login and use your new password to get logged in.
                  </Paragraph>
                </Col>
              </Row>
              <Row
                justify="center"
                align="middle"
                style={{ marginBottom: "2em" }}
              >
                <Col span={24}>
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    block
                    className="login-form-button"
                    onClick={() => props.changePage()}
                  >
                    Return to Login
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ResetPassword;
