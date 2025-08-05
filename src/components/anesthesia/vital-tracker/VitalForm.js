import React from "react";
import VitalFormConfig from "./VitalFormConfig";

import { Col, TimePicker, Form, Input, Row, Select, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

const getInputField = (field) => {
  return (
    <Form.Item
      className="text-default-400"
      label={field.label}
      labelCol={{ span: 24 }}
      name={field.name}
      rules={[
        {
          required: !!field.requiredMessage,
          message: field.requiredMessage,
        },
      ]}
    >
      <Input
        className="text-default-400"
        placeholder={field.placeholder}
        addonAfter={field.addonAfter}
      />
    </Form.Item>
  );
};

const getDateField = (field) => {
  return (
    <Form.Item
      label={field.label}
      labelCol={{ span: 24 }}
      name={field.name}
      width="100%"
      className="text-default-400"
      rules={[
        {
          required: !!field.requiredMessage,
          message: field.requiredMessage,
        },
      ]}
    >
      <TimePicker format={"h:mm A"} use12Hours />
    </Form.Item>
  );
};

const getReadOnlyField = (field, config) => {
  return (
    <Form.Item
      label={field.label}
      className="text-default-400"
      labelCol={{ span: 24 }}
      name={field.name}
    >
      <Text className="text-default-400">#33333</Text>
    </Form.Item>
  );
};

const getSelectField = (field) => {
  let attribute = field.optionAttribute;
  return (
    <Form.Item
      label={field.label}
      className="text-default-400"
      labelCol={{ span: 24 }}
      name={field.name}
      rules={[
        {
          required: !!field.requiredMessage,
          message: field.requiredMessage,
        },
      ]}
    >
      <Select
        showSearch={true}
        placeholder={"Set " + field.label}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {field.inputs.map((option) => {
          return (
            <Option value={attribute ? option[attribute.value] : option}>
              {attribute ? option[attribute.name] : option}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
const VitalForm = (props) => {
  return (
    <>
      <Form
        id="vital-form-id"
        onValuesChange={(value) => {}}
        form={props.vitalForm}
        onFinish={(values, ee) => {
          props.isEdit ? props.onEdit(values) : props.onAdd(values);
        }}
      >
        {VitalFormConfig().map((config, index) => {
          return (
            <Row>
              <Row span={24}>
                <Text className="text-default-500 font-size-16">
                  {config && config.mainLabel}
                </Text>
              </Row>
              <Row gutter={[24, 0]}>
                {config.formFields.map((field, index) => {
                  return (
                    <Col span={field.span}>
                      {(() => {
                        switch (field.type) {
                          case "input":
                            return getInputField(field);
                          case "select":
                            return getSelectField(field);

                          case "dummy":
                            return <div></div>;
                          case "date":
                            return getDateField(field);
                          default:
                            return getReadOnlyField(field);
                        }
                      })()}
                    </Col>
                  );
                })}
              </Row>
            </Row>
          );
        })}
      </Form>
    </>
  );
};

export default VitalForm;
