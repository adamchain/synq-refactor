import React from "react";
import {
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
  Button,
  Popconfirm,
} from "antd";
import { FORM_FIELDS } from "../../appointment-details/Constant";
import PatientCreateEditFormConfig from "./PatientCreateEditFormConfig";
import Cleave from "cleave.js/react";
import "./PatientCreateEditForm.scss";
import FormComponents from "../../generic-components/form-components/FormComponents";

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const dateFormat = "MM/DD/YYYY";

const PatientCreateEditForm = (props) => {
  const getInputField = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        rules={[
          {
            required:
              (props.sendMail &&
                field.label == "Patient Name" &&
                !!field.requiredMessage) ||
              (props.isEdit && !!field.requiredMessage) ||
              (!props.sendMail && !!field.requiredMessage),
            message: field.requiredMessage,
          },
        ]}
      >
        <Input
          className="text-default-400"
          disabled={field.disabled}
          placeholder={field.placeholder}
        />
      </Form.Item>
    );
  };

  const getInsuranceInputField = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        shouldUpdate
      >
        {({ getFieldValue }) => {
          return (
            <Form.Item
              name={field.name}
              rules={[
                {
                  required: getFieldValue("insurance"),
                  message: field.requiredMessage,
                },
              ]}
            >
              <Input
                className="text-default-400"
                disabled={field.disabled}
                placeholder={field.placeholder}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  };

  const getWeightField = (field) => {
    let weightTypeField = field.weightTypeField;
    let attribute = weightTypeField.optionAttribute;

    return (
      <>
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            {/* <span style={{color:"red"}}> *</span>  */}
            <Text> {field.label}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Form.Item
              className="text-default-400"
              name={field.name}
              rules={[
                {
                  required:
                    (props.isEdit && !!field.requiredMessage) ||
                    (!props.sendMail && !!field.requiredMessage),
                  message: field.requiredMessage,
                },
              ]}
            >
              <FormComponents.CleaveNumber field={field} />
              {/* <Input
                       style={{width:"100%"}}
                       className='text-default-400'
                       type="number"
                       precision={2}
                       placeholder={field.placeholder}
                       addonAfter={
                       <Form.Item style={{margin:0}} className='text-default-200'
                       name={weightTypeField.name}
                       rules={[
                        {
                          required: !!field.requiredMessage,
                          message:field.requiredMessage
                        }
                      ]}>
                <Select
                placeholder ={"Select " + weightTypeField.label}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {weightTypeField.inputs.map((option) => {
                        return (
                            <Option
                                value={attribute?option[attribute.value]:option}>
                                {attribute?option[attribute.name]:option}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>}/> */}
            </Form.Item>
          </Col>
          <Col span={10}>
            {" "}
            <Form.Item
              style={{ margin: 0 }}
              className="text-default-200"
              name={weightTypeField.name}
              rules={[
                {
                  required:
                    (props.isEdit && !!field.requiredMessage) ||
                    (!props.sendMail && !!field.requiredMessage),
                  message: field.requiredMessage,
                },
              ]}
            >
              <Select
                placeholder={"Select " + weightTypeField.label}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {weightTypeField.inputs.map((option) => {
                  return (
                    <Option
                      value={attribute ? option[attribute.value] : option}
                    >
                      {attribute ? option[attribute.name] : option}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
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
        rules={[
          {
            required:
              (props.isEdit && !!field.requiredMessage) ||
              (!props.sendMail && !!field.requiredMessage),
            message: field.requiredMessage,
          },
        ]}
      >
        <DatePicker format={dateFormat} className="patientDOBField" />
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
          autoSize={{
            minRows: config.mainLabel === FORM_FIELDS.OBJECTIVE ? 3 : 4,
          }}
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
        rules={[
          {
            required:
              (props.isEdit && !!field.requiredMessage) ||
              (!props.sendMail && !!field.requiredMessage),
            message: field.requiredMessage,
          },
        ]}
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
            required:
              (props.isEdit && !!field.requiredMessage) ||
              (!props.sendMail && !!field.requiredMessage),
            message: field.requiredMessage,
          },
        ]}
      >
        <Select
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
        id="patient-form-id"
        name="control-hooks"
        initialValues={{ breedId: null }}
        onValuesChange={(value) => props.onFormValueChange(value)}
        scrollToFirstError={true}
        form={props.patientform}
        className="client-profile-form"
        onFinish={(values) => props.handleSubmit(values)}
      >
        {PatientCreateEditFormConfig(props.requiredInputData).map(
          (config, index) => {
            return (
              <>
                <Row>
                  <Row span={24}>
                    <Text className="text-default-500 font-size-16">
                      {config && config.mainLabel}
                    </Text>
                  </Row>
                  <Row gutter={[24, 0]}>
                    {config.formFields.map((field, index) => {
                      return (
                        <Col
                          span={
                            field.type === "textarea" ||
                            field.name === "pyDoctorId" ||
                            field.type === "divider"
                              ? 24
                              : 12
                          }
                        >
                          {(() => {
                            switch (field.type) {
                              case "input":
                                return getInputField(field);
                              case "weight":
                                return getWeightField(field);
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
                              case "insurance":
                                return getInsuranceInputField(field);
                              default:
                                return getReadOnlyField(field);
                            }
                          })()}
                        </Col>
                      );
                    })}
                  </Row>
                </Row>
                {props?.noDrawer ? (
                  <></>
                ) : (
                  props.isEdit && (
                    <>
                      <Divider />
                      <Row span={24} style={{ marginBottom: 16 }}>
                        <Text className="text-default-500 font-size-16">
                          Advanced Actions
                        </Text>
                      </Row>
                      <Row span={24} align="middle" justify="start">
                        <Col span={12}>
                          <Popconfirm
                            title="Are you sure you want to delete this Patient?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              props.patientDelete();
                            }}
                          >
                            <Button
                              danger
                              block
                              type="primary"
                              shape="round"
                              size="large"
                              style={{ marginRight: 16, marginTop: 16 }}
                            >
                              Delete patient
                            </Button>
                          </Popconfirm>
                        </Col>
                      </Row>
                    </>
                  )
                )}
              </>
            );
          },
        )}
      </Form>
    </>
  );
};
export default PatientCreateEditForm;
