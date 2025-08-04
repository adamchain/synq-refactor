import React, { useState } from "react";
import { Button, Col, Form, Row } from "antd";
import InventoryReminderDrawer from "./InventoryReminderDrawer";

const InventoryReminderField = ({ field }) => {
  const [reminderDrawer, setReminderDrawer] = useState();

  const ReminderField = ({ value = [], onChange, formRequiredValue }) => {
    return (
      <>
        <Row gutter={[32, 0]} align="middle">
          <Col>{`${value?.length} Active`}</Col>
          <Col>
            <Button
              type="primary"
              size="small"
              ghost
              shape="round"
              onClick={() => {
                setReminderDrawer({
                  onChange,
                  reminders: value,
                  formRequiredValue,
                });
              }}
            >
              {" "}
              Manage
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        shouldUpdate
      >
        {({ getFieldValue }) => {
          return (
            <Form.Item name={field.name}>
              <ReminderField
                formRequiredValue={{
                  code: getFieldValue("code"),
                  pName: getFieldValue("pName"),
                  mfr: getFieldValue("mfr"),
                  vendor: getFieldValue("vendor"),
                }}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
      {reminderDrawer && (
        <InventoryReminderDrawer
          inventoryId={field.inventoryId}
          onChange={(data) => {
            reminderDrawer.onChange(data);
            setReminderDrawer(null);
          }}
          reminders={reminderDrawer.reminders}
          formRequiredValue={reminderDrawer.formRequiredValue}
          onClose={() => {
            setReminderDrawer(null);
          }}
        />
      )}
    </>
  );
};

export default InventoryReminderField;
