import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../../context/CommonContext";
import { FORM_FIELDS } from "../../appointment-details/Constant";
import FormComponents from "../../generic-components/form-components/FormComponents";
import "./StaffCreateEditForm.scss";
import StaffCreateEditFormConfig from "./StaffCreateEditFormConfig";

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const StaffProfileForm = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const context = useContext(CommonContext);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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
          autoComplete="none"
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
          autoComplete="none"
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
      >
        <Text className="text-default-400">#33333</Text>
      </Form.Item>
    );
  };

  const getAdvancedOption = (field, isEdit) => {
    return isEdit ? (
      <Form.Item
        label={field.label}
        className="text-default-400"
        labelCol={{ span: 24 }}
      >
        <Button
          color="red"
          block
          shape="round"
          className="delete-profile-btn"
          onClick={props.deleteStaff}
        >
          {" "}
          Delete Staff
        </Button>
      </Form.Item>
    ) : null;
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
          placeholder={"Select " + field.label}
          autoComplete="none"
          disabled={field.disabled}
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

  useEffect(() => {
    // call backend using props.clientId
    /*if(props.isEdit) {
            form.setFieldsValue({
                staffFirstName: 'Carla',
                staffLastName: 'Politte',
                email: 'carla.polittedvm@gmail.com'
            });
        }*/
    /* if (!!props.setSubmitForm) {
            props.setSubmitForm(submitRef);
        }*/
  });

  /*const handleSubmit = (values) => {
        const title = 'test title';
        const message = 'test message';
    }
    submitRef.current = handleSubmit;*/

  return (
    <Form
      form={props.staffForm}
      id="staff-form-id"
      onValuesChange={(value) => props.onFormValueChange(value)}
      scrollToFirstError={true}
      className="staff-profile-form"
      onFinish={(values) => props.handleSubmit(values)}
    >
      {StaffCreateEditFormConfig(
        Object.values(props.allStates),
        props.requiredInputData,
        context.userProfile.permission,
        props.isEdit,
        context.defaultBranch.branchTypeId,
      ).map((config, index) => {
        return (
          <>
            <Row gutter={[24, 0]}>
              <Col span={24}>
                <Text className="text-default-500 font-size-16">
                  {config && config.mainLabel}
                </Text>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              {config.formFields
                .filter(
                  (k) =>
                    !(["takeAppt"].includes(k.name) && !props.isLeader) &&
                    k.visible,
                )
                .map((field, index) => {
                  return (
                    <Col
                      span={
                        field.name === "address1" ||
                        field.name === "email" ||
                        field.name === "alerts" ||
                        field.name === "secEmail" ||
                        field.name === "discountName" ||
                        field.type === "divider"
                          ? 24
                          : 12
                      }
                    >
                      {(() => {
                        switch (field.type) {
                          case "input":
                            return getInputField(field);
                          case "radio":
                            return getRadioField(field);
                          case "select":
                            return getSelectField(field);
                          case "phone":
                            return FormComponents.getFormItem(field, true);
                          case "textarea":
                            return getTextAreaField(field, config);
                          case "divider":
                            return <Divider />;
                          case "dummy":
                            return <div></div>;
                          case "action":
                            return getAdvancedOption(field, props.isEdit);
                          default:
                            return getReadOnlyField(field);
                        }
                      })()}
                    </Col>
                  );
                })}
            </Row>
          </>
        );
      })}
    </Form>
  );
};
export default StaffProfileForm;
