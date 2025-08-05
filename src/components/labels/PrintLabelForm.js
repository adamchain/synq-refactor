import React from "react";
import {
  Col,
  Divider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import PrintLabelFormConfig from "./PrintLabelFormConfig";

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;
const dateFormat = "MM/DD/YYYY";

const PrintLabelForm = (props) => {
  const getInputField = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
      >
        <Input
          className="text-default-400"
          disabled={field.disabled}
          placeholder={field.placeholder}
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
        className="text-default-400"
      >
        <DatePicker format={dateFormat} />
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
      >
        <Select
          disabled={field.disabled}
          showSearch={true}
          placeholder={"Select " + field.label}
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

  return (
    <>
      <Form
        id="print-label-form-id"
        name="print-label-form"
        form={props.labelForm}
        onValuesChange={(value) => props.onFormValueChange(value)}
        onFinish={(values) => props.handleSubmit(values)}
      >
        {PrintLabelFormConfig(props.formInputData).map((config, index) => {
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
                {config.formFields.map((field, index) => {
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
export default PrintLabelForm;
