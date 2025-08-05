import { PlusOutlined } from "@ant-design/icons";
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
  Switch,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import "./InventoryCreateEdit.scss";
import InventoryCreateEditFormConfig from "./InventoryCreateEditFormConfig";

import { CommonContext } from "../../../context/CommonContext";
import InventoryServices from "../../../services/InventoryServices";
import FormComponents from "../../generic-components/form-components/FormComponents";
import InventoryReminderField from "../inventory-reminder/InventoryReminderField";
import LotDetailField from "../lot-details/LotDetailField";

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const dateFormat = "MM/DD/YYYY";

const InventoryCreateEditForm = (props) => {
  const context = useContext(CommonContext);

  const getInputField = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        hidden={field.hidden}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
      >
        {field.inputType === "number" ? (
          <FormComponents.CleaveNumber field={field} />
        ) : (
          <Input
            prefix={field.prefix ?? ""}
            type={field.inputType ?? "text"}
            className="text-default-400"
            hidden={field.hidden}
            suffix={field.suffix ?? ""}
            disabled={field.disabled}
            placeholder={field.placeholder}
          />
        )}
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
        hidden={field.hidden}
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
        hidden={field.hidden}
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

  const getSwitchField = (field) => {
    return (
      <Form.Item
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        hidden={field.hidden}
        valuePropName="checked"
        className="text-default-400"
      >
        <Switch />
      </Form.Item>
    );
  };

  const getDateField = (field) => {
    return (
      <Form.Item
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        hidden={field.hidden}
        className="text-default-400"
      >
        <DatePicker
          disabled={field.disabled}
          format={dateFormat}
          style={{ width: "100%" }}
        />
      </Form.Item>
    );
  };
  const getTextAreaField = (field, config) => {
    return (
      <Form.Item
        label={field.label}
        className="text-default-400"
        hidden={field.hidden}
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
          autoSize={{ minRows: 3 }}
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
        hidden={field.hidden}
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
        hidden={field.hidden}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
      >
        <Select
          showSearch={true}
          placeholder={field.placeholder}
          disabled={props.manager ? true : field.disabled}
          // placeholder ={"Search by Name "}
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

  const CategorySelect = ({ field }) => {
    let attribute = field.optionAttribute;
    const [newName, setNewName] = useState("");
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
          placeholder={field.placeholder}
          disabled={field.disabled}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: "4px 0" }} />
              <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                <Input
                  style={{ flex: "auto" }}
                  value={newName}
                  onChange={(event) => {
                    let value = event.target.value;
                    setNewName(value);
                  }}
                />
                <a
                  style={{
                    flex: "none",
                    padding: "8px",
                    display: "block",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    InventoryServices.saveInventoryCategories(
                      newName,
                      (data) => {
                        props.fetchAllInventoryCategories(data);
                      },
                    )
                  }
                >
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )}
          // placeholder ={"Search by Name "}
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
        id="inventory-form-id"
        name="control-hooks"
        scrollToFirstError={true}
        onValuesChange={(value) => props.onFormValueChange(value)}
        form={props.inventoryForm}
        className="inventory-profile-form"
        onFinish={(values) => props.handleSubmit(values)}
      >
        {InventoryCreateEditFormConfig(
          props.avoidOptionalUnits,
          props.invData,
          props.invCatData,
          context.defaultBranch.branchTypeId,
        ).map((config, index) => {
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
                  .filter((k) => {
                    return (
                      (k.itemType === undefined ||
                        k.itemType.includes(props.selectedType)) &&
                      k.type !== "escape" &&
                      k.hidden != true
                    );
                  })
                  .map((field, index) => {
                    return (
                      <Col
                        span={field.span ? field.span : 12}
                        hidden={field.hidden}
                      >
                        {(() => {
                          switch (field.type) {
                            case "input":
                              return getInputField(field);
                            case "radio":
                              return getRadioField(field);
                            case "select":
                              return getSelectField(field);
                            case "category-select":
                              return <CategorySelect field={field} />;
                            case "textarea":
                              return getTextAreaField(field, config);
                            case "dummy":
                              return <div></div>;
                            case "checkbox":
                              return getCheckboxField(field);
                            case "date":
                              return getDateField(field);
                            case "switch":
                              return getSwitchField(field);
                            case "divider":
                              return <Divider />;
                            case "on-hands":
                              if (props.avoidOptionalUnits.showLots) {
                                return (
                                  <LotDetailField
                                    field={{
                                      ...field,
                                      inventoryId: props.inventoryId,
                                    }}
                                  />
                                );
                              } else {
                                return getInputField({
                                  ...field,
                                  name: ["detail", "onHand"],
                                });
                              }
                            case "reminder":
                              return (
                                <InventoryReminderField
                                  field={{
                                    ...field,
                                    inventoryId: props.inventoryId,
                                  }}
                                />
                              );
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
export default InventoryCreateEditForm;
