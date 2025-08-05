import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
  Switch,
  Divider,
  Button,
  Popconfirm,
} from "antd";
import { FORM_FIELDS } from "../../appointment-details/Constant";
import ClientCreateEditFormConfig from "./ClientCreateEditFormConfig";
import ClientCreateFormConfig from "./ClientCreateFormConfig";
import "./ClientCreateEditForm.scss";
import CreditCardSection from "../creditCardForm";
import AddressLoader from "../../generic-components/address-loader/AddressLoader";
import FormComponents from "../../generic-components/form-components/FormComponents";
import { CommonContext } from "../../../context/CommonContext";

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const ClientForm = (props) => {
  const [showSecondary, setShowSecondary] = useState(false);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const context = useContext(CommonContext);

  useEffect(() => {
    if (props.isEdit) {
      if (
        props.clientData &&
        props.clientData.discount &&
        Object.keys(props.clientData.discount).length > 0
      ) {
        setShowDiscounts(true);
      }
      if (
        props.clientData &&
        props.clientData.secondary &&
        Object.keys(props.clientData.secondary).length > 0
      ) {
        setShowSecondary(true);
      }
    }
  }, []);

  const getDiscountField = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        shouldUpdate
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
      >
        {({ getFieldValue }) => {
          let type = getFieldValue("discount").type;
          let modifier = type === "$" ? { prefix: "$" } : { suffix: "%" };
          return (
            <Form.Item name={field.name}>
              <Input
                className="text-default-400"
                {...modifier}
                placeholder={field.placeholder}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    );
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
            required:
              (field.label == "Email" && !!field.requiredMessage) ||
              (props.sendMail &&
                field.label == "First Name" &&
                !!field.requiredMessage) ||
              (props.sendMail &&
                field.label == "Last Name" &&
                !!field.requiredMessage) ||
              (props.isEdit && !!field.requiredMessage) ||
              (!props.sendMail && !!field.requiredMessage),
            message: field.requiredMessage,
          },
        ]}
      >
        <Input
          className="text-default-400"
          disabled={props.isEdit && field.label == "Email" ? true : false}
          suffix={field.suffix ?? ""}
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
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
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
          autoComplete="off"
          placeholder={field.placeholder}
          autoSize={{
            minRows: config.mainLabel === FORM_FIELDS.OBJECTIVE ? 3 : 4,
          }}
        />
      </Form.Item>
    );
  };

  const getAddressField = (field, currentForm) => {
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
        <AddressLoader
          onSelect={(k) => {
            currentForm.setFieldsValue({
              primary: {
                address1: k.place,
                address2: k.district,
                city: k.region,
                zipCode: k.postcode,
              },
            });
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
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
      >
        <Text className="text-default-400">#33333</Text>
      </Form.Item>
    );
  };

  // const getSelectField = (field) => {
  //     return (
  //         <Form.Item label={field.label}
  //                    className='text-default-400'
  //                    labelCol={{span: 24}}
  //                    name={field.name}
  //                    style={{paddingRight: 20}}>
  //             <Select
  //                 defaultValue={field.inputs[0]}
  //                 filterOption={(input, option) =>
  //                     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
  //                 {field.inputs.map((option) => {
  //                     return (
  //                         <Option
  //                             value={option}>
  //                             {option}
  //                         </Option>
  //                     );
  //                 })}
  //             </Select>
  //         </Form.Item>
  //     );
  // }

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
          placeholder={"Select"}
          autoComplete="none"
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

  function onSwitchChange(label) {
    if (label === "Secondary Contact") {
      setShowSecondary((k) => !k);
    } else {
      setShowDiscounts((k) => !k);
    }
  }

  return (
    <>
      <Form
        form={props.clientform}
        id="client-form-id"
        className="client-profile-form"
        scrollToFirstError={true}
        onFinish={(values) => props.handleSubmit(values)}
      >
        {(props.isEdit ? ClientCreateEditFormConfig : ClientCreateFormConfig)(
          props.allStates,
        ).map((config, index) => (
          <>
            {config.mainLabel !== "Primary Contact" && <Divider />}
            <Row justify="space-between">
              <Col span={18} className="formSection">
                <Text className="text-default-500 font-size-16">
                  {config && config.mainLabel}
                </Text>
              </Col>
              {config.mainLabel !== "Primary Contact" && (
                <Switch
                  onChange={() => onSwitchChange(config.mainLabel)}
                  checked={
                    config.mainLabel === "Secondary Contact"
                      ? showSecondary
                      : config.mainLabel === "Referrals & Discounts"
                        ? showDiscounts
                        : true
                  }
                />
              )}
            </Row>
            {((config.mainLabel === "Secondary Contact" && showSecondary) ||
              (config.mainLabel === "Referrals & Discounts" && showDiscounts) ||
              config.mainLabel === "Primary Contact") && (
              //config.mainLabel === "Billing Info"
              <Row gutter={[24, 0]}>
                {config.formFields
                  .filter(
                    (field) =>
                      !(field.name === "clientStatus" && !props.isEdit),
                  )
                  .map((field, index) => (
                    <Col
                      span={
                        field.label === "Address" ||
                        field.name === "clientStatus" ||
                        field.label === "Email" ||
                        field.name === "clientAlerts" ||
                        field.label === "Discount Name"
                          ? 24
                          : 12
                      }
                      key={index}
                    >
                      {(() => {
                        switch (field.type) {
                          case "input":
                            if (
                              field.label === "Secondary Contact Email" &&
                              showSecondary
                            ) {
                              field.requiredMessage =
                                "Please add secondary contact email";
                            }
                            return getInputField(field);
                          case "radio":
                            return getRadioField(field);
                          case "select":
                            return getSelectField(field);
                          case "phone":
                            if (props.sendMail) field.requiredMessage = false;
                            return FormComponents.getFormItem(field, true);
                          case "textarea":
                            return getTextAreaField(field, config);
                          case "address":
                            return getInputField(field); // or return getAddressField
                          case "discount":
                            return getDiscountField(field);
                          case "card":
                          //return <CreditCardSection clientId={props.clientData?.clientId} />;
                          //return <CreditCardSection clientId={props.clientData?.clientId} form={props.clientform} />

                          default:
                            return getReadOnlyField(field);
                        }
                      })()}
                    </Col>
                  ))}
              </Row>
            )}
          </>
        ))}

        {props.isEdit &&
          (context.userProfile.permission === "LD" ||
            context.userProfile.permission === "DR") && (
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
                    title="Are you sure you want to delete this Client?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      props.clientDelete();
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
                      Delete Client
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            </>
          )}
      </Form>
    </>
  );
};
export default ClientForm;
