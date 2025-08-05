import {
  Button,
  Row,
  Typography,
  Form,
  Modal,
  Tooltip,
  Col,
  Input,
} from "antd";

import React, { useEffect } from "react";
import FormComponents from "../../generic-components/form-components/FormComponents";
import CommonUtil from "../../util/CommonUtil";
import {
  QuestionCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const handleOk = () => {
  //update notes
};

const InventoryReminderModal = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.formData) {
      form.setFieldsValue(props.formData);
    } else {
      form.setFieldsValue({ unit: "D", groups: [1, 5] });
    }
  }, []);

  const formFields = [
    {
      label: "Reminder Type",
      name: "type",
      type: "select",
      inputs: props.reminderTypes,
      optionAttribute: { name: "name", value: "value" },
      placeholder: "Select",
      span: 12,
    },
    {
      type: "dummy",
      span: 12,
    },
    {
      label: "Reminder Description",
      type: "input",
      name: "name",
      placeholder: "Enter Reminder Description",
      span: 24,
    },
    {
      label: "Time Period",
      name: "unit",
      type: "select",
      inputs: Object.values(CommonUtil.CALENDAR_INTERVAL_OBJECT).filter(
        (k) => k.value !== "Y",
      ),
      optionAttribute: { name: "name", value: "value" },
      span: 12,
    },

    {
      label: "Due in",
      type: "input",
      name: "due",
      prefix: "Hours",
      span: 12,
    },

    {
      label: "Start Alerting In",
      type: "input",
      name: "startAlert",
      prefix: "Hours",
      span: 12,
    },

    {
      label: "Stop Alerting In",
      type: "input",
      name: "stopAlert",
      prefix: "Hours",
      span: 12,
    },
    {
      label: (
        <>
          <Text>Additional Assignees</Text> &nbsp;
          <Tooltip title="This adds additional staff to reminder notifications on the dashboard. By Default this is set to the front desk and appointment owner">
            <QuestionCircleOutlined />
          </Tooltip>
        </>
      ),
      type: "select",
      name: "groups",
      mode: "multiple",
      placeholder: "Add Staff",
      span: 24,
      inputs: props.staffTypes,
      optionAttribute: { name: "name", value: "value" },
    },
  ];

  const customInput = (field) => {
    return (
      <Col span={field.span}>
        <Form.Item
          className="text-default-400"
          label={field.label}
          labelCol={{ span: 24 }}
          shouldUpdate={(prevValues, curValues) =>
            prevValues.unit !== curValues.unit
          }
        >
          {({ getFieldValue }) => {
            return (
              <Form.Item name={field.name}>
                <Input
                  className="text-default-400"
                  suffix={
                    <Text type="secondary">
                      {
                        CommonUtil.CALENDAR_INTERVAL_OBJECT[
                          getFieldValue("unit")
                        ]?.name
                      }
                    </Text>
                  }
                  type={"number"}
                  placeholder={field.placeholder}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
      </Col>
    );
  };

  return (
    <Modal
      visible={true}
      onCancel={() => props.onClose()}
      title={(props.isEdit ? "Edit" : "Add") + " Reminder"}
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
              htmlType="submit"
              form="inventory-reminder-form-id"
              type="primary"
              size="large"
              shape="round"
              onClick={handleOk}
            >
              Save
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        form={form}
        id="inventory-reminder-form-id"
        onFinish={(values) => {
          props.isEdit
            ? props.reminderEdit({ ...props.formData, ...values })
            : props.reminderAdd(values);
        }}
      >
        <Row gutter={[24, 0]}>
          {formFields.map((k) =>
            ["due", "startAlert", "stopAlert"].includes(k.name)
              ? customInput(k)
              : FormComponents.getFormItem(k),
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default InventoryReminderModal;
