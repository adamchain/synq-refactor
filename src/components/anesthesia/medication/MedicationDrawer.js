import React, { useState, useEffect } from "react";
import { Button, Drawer, Row, Col, Form, Select, Input } from "antd";
import "./Medication.scss";
import MedicationFormConfig from "./MedicationFormConfig";
import InventoryServices from "../../../services/InventoryServices";

const { Option } = Select;

const selectComponent = (field) => {
  let attribute = field.optionAttribute;
  return (
    <Select
      showSearch={true}
      placeholder={"Select " + field.label}
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

const inputComponent = (field, ref) => {
  let addonAfter =
    field.name === "dose" ? (
      <Select onChange={(value) => ref.setDoseUnit(value)} value={ref.doseUnit}>
        <Option value={1}>mg/kg</Option>
        <Option value={2}>mcg/g</Option>
      </Select>
    ) : null;
  let suffix = field.name === "concentration" ? "mg/ml" : null;
  return (
    <Input
      {...{
        className: "text-default-400",
        placeholder: field.placeholder,
        addonAfter,
        suffix,
      }}
    />
  );
};

const formComponent = (field, ref) => {
  return (
    <Col span={field.span}>
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
        {field.type === "input"
          ? inputComponent(field, ref)
          : selectComponent(field)}
      </Form.Item>
    </Col>
  );
};

const MedicationDrawer = ({ inputData, onClose, onAddOrUpdate }) => {
  const [doseUnit, setDoseUnit] = React.useState(1);

  const handleOnAdd = (submitData) => {};
  const [form] = Form.useForm();
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    if (inputData.item) {
      form.setFieldsValue({ ...inputData.item });
      setDoseUnit(inputData.item.doseUnit);
    }
    InventoryServices.searchItemByType("I", setInventoryData);
  }, [inputData]);

  return (
    <Drawer
      className="medication-drawer"
      title={(inputData.isEdit ? "Edit " : "Add ") + inputData.title}
      width={492}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          <Button onClick={onClose} shape="round" style={{ marginRight: 16 }}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            form="medication-form-id"
            size="large"
            shape="round"
          >
            {inputData.isEdit ? "Update " : "Add"}
          </Button>
        </div>
      }
    >
      <Form
        id="medication-form-id"
        form={form}
        onFinish={(values) =>
          onAddOrUpdate(inputData.type, inputData.isEdit, {
            ...values,
            id: inputData.isEdit ? inputData.item.id : null,
            doseUnit,
          })
        }
      >
        <Row gutter={[24, 0]}>
          {MedicationFormConfig({ inventoryData }).map((field, index) =>
            formComponent(field, { doseUnit, setDoseUnit }),
          )}
        </Row>
      </Form>
    </Drawer>
  );
};
export default MedicationDrawer;
