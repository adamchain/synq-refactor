import React, { Fragment, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Card,
  Upload,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { HeaderLogo } from "../util/SvgUtil.jsx";
import axios from "axios";
import loginimage from "./loginimage.jpg";
import "./LoginPage.scss";
import { loginUser } from "../../services";
// import WelcomePage from "../login-welcome-page/WelcomePage";
// import StaffCreateEditFormConfig from "../staff-page/create-edit-staff-form/StaffCreateEditFormConfig";
// import FormComponents from "../generic-components/form-components/FormComponents";
// import CustomImage from "../generic-components/custom-image/CustomImage";
// import LoginProfile from "./LoginProfile";
// import ResetPassword from "./ResetPassword";
// import OnboardPage from "../onboard-welcome-page/OnboardPage";

const { Text, Title, Link } = Typography;
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

// const profile_config = StaffCreateEditFormConfig([])[0]
//   .formFields.filter(
//     (k) => !["Active", "Permissions", "Alt Phone"].includes(k.label),
//   )
//   .map((k) => ({ ...k, span: k.span ?? 12 }));

const LoginForm = (props) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [pageType, setPageType] = useState(props.type || "login");

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    switch (key) {
      case "username":
        if (form.getFieldValue("validationVariable").includes("wrong-usn")) {
          //form.setFieldsValue({"validationVariable":form.getFieldValue("validationVariable").replaceAll("wrong-usn","")});
          form.setFieldsValue({ validationVariable: "" });
          form.validateFields();
        }
        break;
      case "password":
        if (form.getFieldValue("validationVariable").includes("wrong-pwd")) {
          //form.setFieldsValue({"validationVariable":form.getFieldValue("validationVariable").replaceAll("wrong-pwd","")});
          form.setFieldsValue({ validationVariable: "" });
          form.validateFields();
        }
        break;
    }
  };
  const onFinish = (values) => {
    loginUser(values)
      .then((res) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;

        localStorage.setItem("user-token", res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        form.setFieldsValue({ validationVariable: "wrong-pwd,wrong-usn" });
        form.validateFields();
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Row className="login-layout">
        <Col xs={24} xl={12} xxl={10} className="login-side">
          <Card bordered={false} className="login-shrinkwrap">
            {/* <HeaderLogo height="120px" /> */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h1>WHSKR</h1>
            </div>
            {/* {pageType === "welcome" && <WelcomePage />} */}
            {/* {pageType === "onboard" && <OnboardPage />} */}
            {/* {pageType === "reset-pwd" && (
              <ResetPassword
                extra={props.extra}
                subType={props.subType}
                changePage={() => setPageType("login")}
              />
            )} */}

            {pageType === "login" && (
              <>
                <Title style={{ marginBottom: 24 }} level={3}>
                  Sign In
                </Title>
                <Form
                  onValuesChange={(value) => onFormValueChange(value)}
                  form={form}
                  layout="vertical"
                  id="login-form-id"
                  name="normal_login"
                  {...formItemLayout}
                  initialValues={{
                    remember: true,
                    validationVariable: "",
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label={<Text className="login-label">Email</Text>}
                    name="username"
                    className="login-formfield"
                    rules={[
                      {
                        required: true,
                        message: "An valid email required to Login",
                      },
                      {
                        validateTrigger: "onChange",
                        validator: async (rule, value) => {
                          if (
                            form
                              .getFieldValue("validationVariable")
                              .includes("wrong-usn")
                          ) {
                            throw new Error("An valid email required to Login");
                          }
                        },
                      },
                    ]}
                  >
                    <Input placeholder="doctor@clinic.com" size="large" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <Row justify="space-between" style={{ width: "100%" }}>
                        <Col>
                          <Text className="login-label">Password</Text>
                        </Col>
                        <Col>
                          <Link onClick={() => setPageType("reset-pwd")}>
                            {"Forgot Password"}
                          </Link>
                        </Col>
                      </Row>
                    }
                    name="password"
                    placeholder="Enter Password"
                    size="large"
                    className="login-formfield"
                    rules={[
                      {
                        required: true,
                        message: "A valid password required to Login",
                      },
                      {
                        validateTrigger: ["onChange"],
                        validator: async (rule, value) => {
                          if (
                            form
                              .getFieldValue("validationVariable")
                              .includes("wrong-pwd")
                          ) {
                            throw new Error(
                              "A valid password required to Login",
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <Input type="password" placeholder="" size="large" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      shape="round"
                      form="login-form-id"
                      block
                      className="login-form-button"
                    //onClick={() => setPageType("password")}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                  <Form.Item hidden={true} name="validationVariable">
                    <Input type="hidden" />
                  </Form.Item>

                  {/* <Space direction="vertical">

                                        <Text className="login-label">

                                            Don't have an account? <a href="">Sign Up</a>

                                        </Text>

                                    </Space> */}
                </Form>
                <div style={{ textAlign: "center", paddingTop: "24px" }}>
                  <Text style={{ fontSize: "12px" }} type="secondary">
                    By logging in, you agree to WHSKR’s &nbsp;
                    <a
                      style={{ fontWeight: "500" }}
                      href="http://whskr.com/wp-content/uploads/2022/04/WHSKR-Privacy-Policy-v.pdf"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      style={{ fontWeight: "500" }}
                      href="http://whskr.com/wp-content/uploads/2022/04/WHSKR-LLC-Online-Customer-Terms-and-Conditions-v.2B.pdf"
                      target="_blank"
                    >
                      Terms of Service
                    </a>
                  </Text>
                </div>
              </>
            )}

            {pageType === "password" && (
              <>
                <Title level={3} style={{ marginBottom: 0 }}>
                  Create Password
                </Title>
                <Text className="createPassDesc" type="secondary">
                  Get access to your account by creating a password
                </Text>
                <Form
                  style={{ marginTop: 24 }}
                  layout="vertical"
                  name="normal_login"
                  {...formItemLayout}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label={<Text className="login-label">Password</Text>}
                    name="username"
                    rules={[
                      {
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      placeholder="Password"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <Text className="login-label">Confirm Password</Text>
                    }
                    name="password"
                    rules={[
                      {
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      shape="round"
                      block
                      className="login-form-button"
                      onClick={() => setPageType("password-success")}
                    >
                      Create Password
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}

            {pageType === "password-success" && (
              <>
                <Row
                  style={{ marginBottom: "32px" }}
                  justify="center"
                  align="middle"
                >
                  <Col>
                    <CheckCircleOutlined
                      style={{ fontSize: "5em", color: "limegreen" }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{ marginBottom: "0px" }}
                  justify="center"
                  align="middle"
                >
                  <Col>
                    <Title
                      style={{ fontWeight: 500, marginBottom: 0 }}
                      level={3}
                    >
                      Password Successfully Updated!
                    </Title>
                  </Col>
                </Row>
                <Row
                  style={{ marginBottom: "16px" }}
                  justify="center"
                  align="middle"
                >
                  <Col>
                    {" "}
                    <Title level={5} style={{ fontWeight: 400 }}>
                      Next, let's check your profile information
                    </Title>
                  </Col>
                </Row>
                <Row
                  style={{ marginBottom: "16px" }}
                  justify="center"
                  align="middle"
                >
                  <Col className="passwordSuccessDesc">
                    {" "}
                    <Text type="secondary">
                      Please make sure that your profile information is up to
                      date so your clinic and clients have the best experience
                      possible.
                    </Text>
                  </Col>
                </Row>
                <Row justify="center" align="middle">
                  <Col span={24}>
                    {" "}
                    <Button
                      className="login-form-button"
                      block
                      type="primary"
                      shape="round"
                      onClick={() => setPageType("profile")}
                    >
                      Update Profile
                    </Button>
                  </Col>
                </Row>
              </>
            )}

            {/* {pageType === "profile" && (
              <LoginProfile setPageType={setPageType} />
            )} */}
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
    </Fragment>
  );
};

export default LoginForm;
