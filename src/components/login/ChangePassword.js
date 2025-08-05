import React, { useState, useEffect } from "react";
import { Button, Input, Col, Row, Form, Typography, Modal } from "antd";
import "./ChangePassword.scss";
import LoginServices from "../../services/LoginServices";

const { Text } = Typography;
const { TextArea } = Input;

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

const ChangePasswordModal = (props) => {
  const [form2] = Form.useForm();

  return (
    <Modal
      className="notes-modal"
      title="Change Password"
      visible={true}
      onCancel={props.onClose}
      footer={null}
    >
      <>
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
            let inputdata = { currentPwd: values.curpwd, newPwd: values.pwd };
            //console.log("====>",inputdata)
            LoginServices.changePassword(inputdata, () => {
              props.onClose();
            });
            // LoginServices.resetPassword(values.pwd,props.extra.uuid,props.extra.token,()=>{
            //       //TODO success or failure check
            //       //setPageType("reset-success");
            //   });
          }}
        >
          <Form.Item
            label={<Text className="login-label">Current Password</Text>}
            name="curpwd"
            extra="Must be atleast 8 characters"
            rules={[
              {
                required: true,
                message: "Please enter current password",
              },
            ]}
          >
            <Input type="password" size="large" />
          </Form.Item>

          <Form.Item
            label={<Text className="login-label">New Password</Text>}
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
            label={<Text className="login-label">Confirm New Password</Text>}
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
            Change Password
          </Button>

          <Form.Item hidden={true} name="validationVariable">
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </>
    </Modal>
  );
};

export default ChangePasswordModal;
