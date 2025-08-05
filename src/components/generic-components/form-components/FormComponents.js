import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Input,
  Select,
  Radio,
  Typography,
  Divider,
  Col,
  Form,
  Row,
  InputNumber,
} from "antd";
import Cleave from "cleave.js/react";
import CleavePhone from "cleave.js/dist/addons/cleave-phone.pt";

const { Text } = Typography;
const { Option } = Select;

const dateFormat = "MM/DD/YYYY";

export default class FormComponents {
  static disabledDate(current) {
    // Can not select days before today and today
    return current.valueOf() > Date.now();
  }

  static getReadOnlyField = (field) => {
    return <Text className="text-default-400">{field.value}</Text>;
  };

  static getDateField = (field) => {
    return (
      <DatePicker
        format={dateFormat}
        style={{ width: "100%" }}
        allowClear={false}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
        disabledDate={field.ftype ? field.ftype : ""}
      />
    );
  };

  static getInputField = (field) => {
    let _this = this;
    return field.inputType === "number" ? (
      <_this.CleaveNumber field={field} />
    ) : (
      <Input
        className="text-default-400"
        suffix={field.suffix ?? ""}
        prefix={field.prefix ?? ""}
        precision={2}
        type={field.inputType ?? "text"}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
        placeholder={field.placeholder}
      />
    );
  };

  // static getInputNumberField = (field) => {
  //     let _this= this;
  //     return (
  //         field.inputType === "number"?
  //            <_this.CleaveNumber field={field}/>
  //         :
  //             <InputNumber className='text-default-400'
  //                    suffix={field.suffix??""}
  //                    prefix={field.prefix??""}
  //                    precision={2}
  //                    type={field.inputType??"text"}
  //                    placeholder={field.placeholder}/>
  //     );
  // }

  static getSelectField = (field) => {
    let attribute = field.optionAttribute;
    return (
      <Select
        mode={field.mode ?? ""}
        showSearch={true}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
        placeholder={
          field.placeholder ? field.placeholder : "Select " + field.label
        }
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
    );
  };

  static getRadioField = (field) => {
    let attribute = field.optionAttribute;
    return (
      <Radio.Group>
        {field.inputs.map((option, index) => {
          return (
            <Radio value={attribute ? option[attribute.value] : option}>
              {attribute ? option[attribute.name] : option}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  };

  static onlyFormItem = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
        name={field.name}
      >
        {this.getFormComponent(field)}
      </Form.Item>
    );
  };
  static getFormItem = (field, noCol) => {
    return (
      <>
        {noCol ? (
          this.onlyFormItem(field)
        ) : (
          <Col span={field.span}>{this.onlyFormItem(field)}</Col>
        )}
      </>
    );
  };

  static getFormComponent = (field) => {
    switch (field.type) {
      case "input":
        return this.getInputField(field);
      case "radio":
        return this.getRadioField(field);
      case "select":
        return this.getSelectField(field);
      case "phone":
        return this.cleavePhoneNumber(field);
      // case 'textarea':
      //     return this.getTextAreaField(field, config);
      case "dummy":
        return <div></div>;
      case "divider":
        return <Divider />;
      // case 'checkbox' :
      //     return getCheckboxField(field);
      case "date":
        return this.getDateField(field);
      default:
        return this.getReadOnlyField(field);
    }
  };

  static CleaveNumber = ({ value = null, onChange, field }) => {
    const [input, setInput] = useState();

    useEffect(() => {
      if (!input && input == value) {
        setInput(value ? parseFloat(value).toFixed(2) : value);
      } else {
        setInput(value);
      }
    }, [value]);
    return (
      <Cleave
        className="ant-input"
        disabled={field.disabled}
        value={input}
        onChange={(e) => {
          let val = e.target.rawValue;
          setInput(val);
          onChange(val);
        }}
        placeholder={field.placeholder}
        options={{
          numeral: true,
          disabled: field.disabled,
          rawValueTrimPrefix: true,

          numeralDecimalScale: 2,
          tailPrefix: !!field.suffix,
          prefix: field.prefix || field.suffix || "",
        }}
      />
    );
  };

  static cleavePhoneNumber = (field) => {
    return (
      <Cleave
        className="ant-input"
        disabled={field.disabled}
        placeholder={field.placeholder}
        options={{ blocks: [3, 3, 4], delimiter: "-", numericOnly: true }}
      />
    );
  };

  static cleaveCreditCard = ({ value = null, onChange, field }) => {
    return (
      <Row justify="center">
        <Col span={15}>
          <Cleave
            style={{ borderRight: "none" }}
            className="ant-input"
            placeholder="Card Number"
            options={{
              creditCard: true,
            }}
            onChange={(e) => {
              let val = e.target.rawValue;
              onChange(val);
            }}
          />
        </Col>
        <Col span={5}>
          <Cleave
            className="ant-input"
            style={{ borderRight: "none", borderLeft: "none" }}
            className="ant-input"
            placeholder="MM/YY"
            options={{ date: true, datePattern: ["m", "d"] }}
            onChange={(e) => {
              let val = e.target.rawValue;
              onChange(val);
            }}
          />
        </Col>
        <Col span={4}>
          <Cleave
            className="ant-input"
            placeholder="CVV"
            options={{
              blocks: [3],
              numericOnly: true,
            }}
            style={{ borderLeft: "none" }}
            onChange={(e) => {
              let val = e.target.rawValue;
              onChange(val);
            }}
          />
        </Col>
      </Row>
    );
  };
}
