import { Button, Row, Form, Modal, Col } from "antd";
import React, { useEffect } from "react";
import FormComponents from "../../generic-components/form-components/FormComponents";
import "./AddEditLotModal.scss";

const handleOk = () => {
  //update notes
};

const AddEditLotModel = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.formData) {
      form.setFieldsValue(props.formData);
    }
  }, []);
  const formFields = [
    {
      label: "Quantity",
      type: "input",
      name: "qty",
      inputType: "number",
      span: 12,
    },
    {
      label: "Lot Number",
      type: "input",
      name: "lotNumber",
      span: 12,
    },
    {
      label: "Manufacturer",
      name: "manufacturer",
      type: "input",
      span: 24,
    },
    {
      label: "Expiration Date",
      type: "date",
      name: "expiryDate",
      span: 12,
    },
    {
      type: "dummy",
      span: 12,
    },
    {
      label: "Cost",
      type: "input",
      inputType: "number",
      name: "cost",
      span: 12,
      prefix: "$",
      placeholder: "0.00",
      precision: "2",
    },
    {
      label: "Price",
      type: "input",
      inputType: "number",
      name: "price",
      span: 12,
      prefix: "$",
      placeholder: "0.00",
      precision: "2",
    },
    {
      label: "PO Number",
      type: "input",
      name: "poNumber",
      span: 12,
    },
    {
      type: "dummy",
      span: 12,
    },
    {
      label: "PO Vendor",
      type: "input",
      name: "poVendor",
      span: 24,
    },
  ];

  return (
    <Modal
      visible={true}
      onCancel={() => props.onClose()}
      title="Add Lot"
      width={478}
      footer={[
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button
              block
              size="large"
              shape="round"
              key="back"
              onClick={props.onClose}
            >
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              type="primary"
              size="large"
              shape="round"
              htmlType="submit"
              form="lot-detail-form"
            >
              Save
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        form={form}
        id="lot-detail-form"
        onFinish={(values) => {
          props.isEdit
            ? props.editLot({ ...props.formData, ...values })
            : props.addLot(values);
        }}
      >
        <Row gutter={[24, 0]}>
          {formFields.map((k) => FormComponents.getFormItem(k))}
        </Row>
      </Form>
    </Modal>
  );
};

export default AddEditLotModel;
