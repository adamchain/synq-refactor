import React, { useState, useEffect, useImperativeHandle } from "react";
import GeneralAnestheticFormConfig from "./GeneralAnestheticFormConfig";
import AnesthesiaGeneralServices from "./../../../services/AnesthesiaGeneralServices";
import {
  Checkbox,
  Col,
  TimePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
  Button,
} from "antd";
import { localToUtc, utcToLocal } from "../../util/TimeUtil";
import { forwardRef } from "react";

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

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
        type={field.inputType ?? "text"}
        placeholder={field.placeholder}
      />
    </Form.Item>
  );
};
const getRadioField = (field) => {
  let attribute = field.optionAttribute;
  return (
    <Form.Item
      label={field.label}
      labelCol={{ span: 24 }}
      name={field.name}
      className="text-default-400"
    >
      <Radio.Group>
        {field.inputs.map((option, index) => {
          return (
            <Radio value={attribute ? option[attribute.value] : option}>
              {attribute ? option[attribute.name] : option}
            </Radio>
          );
        })}
      </Radio.Group>
    </Form.Item>
  );
};

const getCheckboxField = (field) => {
  return (
    <Form.Item
      label={field.label}
      labelCol={{ span: 24 }}
      name={field.name}
      className="text-default-400"
    >
      <Checkbox.Group>
        {field.inputs.map((k) => (
          <Checkbox value={k.value}>{k.label}</Checkbox>
        ))}
      </Checkbox.Group>
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
      <TimePicker format={"h:mm A"} use12Hours />
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
    >
      <Select
        showSearch={true}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        placeholder={"Select " + field.label}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {field.inputs.map((option) => {
          return (
            <Option value={attribute ? option[attribute.value] : option}>
              {`${field.name === "surgeon" ? "Dr. " : ""} ${attribute ? option[attribute.name] : option}`}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
const formatTime = (input) => (input ? utcToLocal(input, "h:mm A") : null);

const timeToString = (input) =>
  input ? localToUtc(input).format("hh:mm:ss") : null;

const GeneralAnestheticForm = forwardRef((props, ref) => {
  const [requiredInputData, setRequiredInputData] = useState({ id: 0 });

  const [form] = Form.useForm();

  const updateFormInitialValues = (input) => {
    setRequiredInputData((k) => ({ ...k, id: input.id }));
    input.anesStTime = formatTime(input.anesStTime);
    input.anesEndTime = formatTime(input.anesEndTime);
    input.surgeryStTime = formatTime(input.surgeryStTime);
    input.surgeryEndTime = formatTime(input.surgeryEndTime);
    form.setFieldsValue(input);
  };
  const updateAnestheticData = () => {
    AnesthesiaGeneralServices.getAnesthesiaGeneralByApptId(
      props.apptId,
      updateFormInitialValues,
    );
  };

  useEffect(() => {
    updateAnestheticData();
  }, []);

  const handleSubmit = (values, showError) => {
    let input = { ...values };
    input.apptId = props.apptId;
    input.patientId = props.patientId;
    input.anesStTime = timeToString(input.anesStTime);
    input.anesEndTime = timeToString(input.anesEndTime);
    input.surgeryStTime = timeToString(input.surgeryStTime);
    input.surgeryEndTime = timeToString(input.surgeryEndTime);
    //alert(JSON.stringify(input));
    if (requiredInputData?.id) {
      input.id = requiredInputData.id;
      AnesthesiaGeneralServices.updateAnesthesiaGeneral(
        input,
        () =>
          AnesthesiaGeneralServices.getAnesthesiaGeneralByApptId(
            props.apptId,
            updateFormInitialValues,
          ),
        showError,
      );
    } else {
      AnesthesiaGeneralServices.createAnesthesiaGeneral(
        input,
        { ...values },
        showError,
      );
    }
  };

  useImperativeHandle(ref, () => ({
    updateForm() {
      handleSubmit(form.getFieldsValue(), false);
    },
  }));
  return (
    <>
      <Form
        id="anesthetic-form-id"
        form={form}
        onFinish={(values) => handleSubmit(values, true)}
      >
        {GeneralAnestheticFormConfig(props.doctorDetails).map(
          (config, index) => {
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
                            case "radio":
                              return getRadioField(field);
                            case "select":
                              return getSelectField(field);
                            case "textarea":
                              return getTextAreaField(field, config);
                            case "dummy":
                              return <div></div>;
                            case "divider":
                              return <Divider />;
                            case "checkbox":
                              return getCheckboxField(field);
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
          },
        )}
      </Form>
      <Row justify="end">
        <Col>
          <Button
            style={{ minWidth: "150px" }}
            shape="round"
            size="large"
            htmlType="submit"
            form="anesthetic-form-id"
            type="primary"
          >
            {requiredInputData?.id ? "Update" : "Save"}
          </Button>
        </Col>
      </Row>
    </>
  );
});

export default GeneralAnestheticForm;
