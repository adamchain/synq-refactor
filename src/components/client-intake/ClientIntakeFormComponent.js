import React, { useState } from "react";
import { Form, Input, Select, Button, Radio, Switch, Row, Col } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const ClientIntakeFormComponent = () => {
  const [showSecondaryContact, setShowSecondaryContact] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);
  const [form] = Form.useForm();

  const validationRules = {
    required: [{ required: true, message: "This field is required" }],
    email: [{ type: "email", message: "Please enter a valid email" }],
    phone: [{ pattern: /^\d{3}-\d{3}-\d{4}$/, message: "Format XXX-XXX-XXXX" }],
    zip: [{ pattern: /^\d{5}$/, message: "Enter a valid 5-digit zip code" }],
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="registrationForm"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h3>Primary Contact</h3>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={validationRules.required}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={validationRules.required}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Address"
        name="address"
        rules={validationRules.required}
      >
        <Input placeholder="Enter your address" />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Apt / Suite / Unit" name="aptSuiteUnit">
            <Input placeholder="Enter Apt/Suite/Unit" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="City" name="city" rules={validationRules.required}>
            <Input placeholder="Enter your city" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="State"
            name="state"
            rules={validationRules.required}
          >
            <Select placeholder="Select a state">
              <Option value="NY">New York</Option>
              <Option value="CA">California</Option>
              <Option value="TX">Texas</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Zip" name="zip" rules={validationRules.zip}>
            <Input placeholder="Enter your zip code" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Primary Phone"
            name="primaryPhone"
            rules={validationRules.phone}
          >
            <Input placeholder="XXX-XXX-XXXX" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Mobile Phone"
            name="mobilePhone"
            rules={validationRules.phone}
          >
            <Input placeholder="XXX-XXX-XXXX" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Alt Phone"
            name="altPhone"
            rules={validationRules.phone}
          >
            <Input placeholder="XXX-XXX-XXXX" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Preferred Phone"
            name="preferredPhone"
            rules={validationRules.required}
          >
            <Select placeholder="Select preferred phone">
              <Option value="primary">Primary Phone</Option>
              <Option value="mobile">Mobile Phone</Option>
              <Option value="alt">Alt Phone</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Ok to Email"
            name="okToEmail"
            rules={validationRules.required}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Ok to Text"
            name="okToText"
            rules={validationRules.required}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Opt-in Patient Reminders"
        name="optInReminders"
        rules={validationRules.required}
      >
        <Radio.Group>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Client Alerts" name="clientAlerts">
        <TextArea rows={4} placeholder="Enter Client Alerts" />
      </Form.Item>

      <Row align="middle">
        <Col xs={18}>
          <h3>Add Secondary Contact</h3>
        </Col>
        <Col xs={6}>
          <Switch
            checked={showSecondaryContact}
            onChange={setShowSecondaryContact}
          />
        </Col>
      </Row>

      {showSecondaryContact && (
        <>
          <Form.Item
            label="Secondary Contact First Name"
            name="secondaryFirstName"
            rules={validationRules.required}
          >
            <Input placeholder="Enter secondary contact's first name" />
          </Form.Item>

          <Form.Item
            label="Secondary Contact Last Name"
            name="secondaryLastName"
            rules={validationRules.required}
          >
            <Input placeholder="Enter secondary contact's last name" />
          </Form.Item>

          <Form.Item
            label="Primary Phone"
            name="secondaryPrimaryPhone"
            rules={validationRules.phone}
          >
            <Input placeholder="XXX-XXX-XXXX" />
          </Form.Item>

          <Form.Item label="Alt Phone" name="secondaryAltPhone">
            <Input placeholder="XXX-XXX-XXXX" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="secondaryEmail"
            rules={validationRules.email}
          >
            <Input placeholder="Enter secondary contact's email" />
          </Form.Item>
        </>
      )}

      <Row align="middle">
        <Col xs={18}>
          <h3>Referrals & Discount</h3>
        </Col>
        <Col xs={6}>
          <Switch checked={showReferrals} onChange={setShowReferrals} />
        </Col>
      </Row>

      {showReferrals && (
        <>
          <Form.Item label="Referrer Name" name="referrerName">
            <Input placeholder="Enter referrer name" />
          </Form.Item>

          <Form.Item label="Discount Name" name="discountName">
            <Input placeholder="Enter discount name" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Discount Type" name="discountType">
                <Select placeholder="Select discount type">
                  <Option value="%">% Off</Option>
                  <Option value="$">$ Off</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Discount Value" name="discountValue">
                <Input placeholder="Enter discount value" />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClientIntakeFormComponent;
