import React from "react";
import {
  Button,
  Col,
  Divider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import ReminderFormConfig from "./ReminderFormConfig";

const WORKING_DAYS_LIST = [
  { displayDay: "S", value: "onSunday", isSelected: false },
  { displayDay: "M", value: "onMonday", isSelected: false },
  { displayDay: "T", value: "onTuesday", isSelected: false },
  { displayDay: "W", value: "onWednesday", isSelected: false },
  { displayDay: "T", value: "onThursday", isSelected: false },
  { displayDay: "F", value: "onFriday", isSelected: false },
  { displayDay: "S", value: "onSaturday", isSelected: false },
];

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const dateFormat = "MM/DD/YYYY";

const ReminderForm = (props) => {
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
          suffix={field.suffix ?? ""}
          type={field.inputType ?? "text"}
          placeholder={field.placeholder}
        />
      </Form.Item>
    );
  };

  const DaysComponent = ({ value = [], onChange }) => {
    return (
      <Row gutter={[16, 0]}>
        {WORKING_DAYS_LIST.map((day) => {
          let isSelected = value.includes(day.value);

          return (
            <Col>
              <Button
                shape="circle"
                type={isSelected ? "primary" : "default"}
                onClick={() => {
                  let tempDays = [...value];
                  if (isSelected) {
                    tempDays = tempDays.filter((k) => k !== day.value);
                  } else {
                    tempDays.push(day.value);
                  }
                  onChange(tempDays);
                }}
              >
                {day.displayDay}
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  };

  const getDaysField = (field) => {
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
        <DaysComponent />
      </Form.Item>
    );
  };

  const getDateField = (field) => {
    return (
      <Form.Item
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        className="text-default-400 reminderDatePicker"
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
      >
        <DatePicker format={dateFormat} allowClear={false} />
      </Form.Item>
    );
  };
  const getTextAreaField = (field, config) => {
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
        <TextArea
          className="text-default-400"
          placeholder={field.placeholder}
          autoSize={{ minRows: 5 }}
        />
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
        <Text
          className="text-default-400"
          style={field.name === "rxNumber" ? { fontStyle: "italic" } : {}}
        >
          {field.value}
        </Text>
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
          mode={field.mode ?? ""}
          showSearch={true}
          placeholder={"Select " + field.label}
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {field.inputs.map((option) => {
            return (
              <Option
                value={attribute ? option[attribute.value] : option}
                disabled={option.disabled}
              >
                {attribute ? option[attribute.name] : option}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  };

  return (
    <>
      <Form
        id="reminder-form-id"
        name="reminder-form"
        form={props.reminderform}
        onValuesChange={(value) => props.onFormValueChange(value)}
        onFinish={(values) => props.handleSubmit(values)}
      >
        {ReminderFormConfig(props.formInputData).map((config, index) => {
          return (
            <Row>
              <Row span={24}>
                <Col>
                  <Text className="text-default-500 font-size-16">
                    {config && config.mainLabel}
                  </Text>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                {config.formFields
                  .filter((k) => k.isVisible === undefined || k.isVisible)
                  .map((field, index) => {
                    return (
                      <Col span={field.fullSize ? 24 : 12}>
                        {(() => {
                          switch (field.type) {
                            case "input":
                              return getInputField(field);
                            case "select":
                              return getSelectField(field);
                            case "textarea":
                              return getTextAreaField(field, config);
                            case "dummy":
                              return <div></div>;
                            case "date":
                              return getDateField(field);
                            case "divider":
                              return <Divider />;
                            case "days":
                              return getDaysField(field);
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
export default ReminderForm;
