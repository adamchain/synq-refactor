import React, { Fragment } from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import LoginServices from "../../services/LoginServices";
//import { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import "./Registration.scss";
//import { CommonEstimateContext } from '../../context/CommonContext';

const { Text, Title } = Typography;

const formItemLayout = {
  labelCol: {
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    sm: {
      span: 14,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    LoginServices.registerUser({ orgName: "WHSKR", ...values, country: 12 })
      .then((res) => history.replace("/login"))
      .catch((err) => console.log + err);
  };

  return (
    <Fragment>
      <Row style={{ margin: "40px" }}>
        <Col span={8}>
          <Title
            level={3}
            style={{ color: "#008489", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "https://WHSKR.com/";
            }}
          >
            WHSKR
          </Title>
        </Col>
        <Col span={10}></Col>

        <Col span={6}>
          <Title level={5}>
            <Link to="/login">Log In</Link>
          </Title>
        </Col>
      </Row>

      <Row className="reg-layout">
        <Col span={8}></Col>
        <Col span={8}>
          <Text className="reg-desc">VET CRM</Text>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item>
              <p className="reg-label">Start your free 14-day trial</p>
            </Form.Item>
            <Form.Item
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input placeholder="Full Name" size="large" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Business Email" size="large" />
            </Form.Item>
            <Form.Item
              name="companyname"
              rules={[
                {
                  required: true,
                  message: "Please input your company name!",
                },
              ]}
            >
              <Input placeholder="Company Name" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "22em" }}
            >
              CREATE MY ACCOUNT
            </Button>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
    </Fragment>
  );
};

export default RegistrationForm;
