import React, { useState } from "react";
import { Button, Col, Form, Row } from "antd";
import LotDetailsDrawer from "./LotDetailsDrawer";

const LotDetailField = ({ field }) => {
  const [viewLotsDrawer, setViewLotsDrawer] = useState();

  const LotField = ({ value = [], onChange, formRequiredValue }) => {
    return (
      <>
        <Row gutter={[32, 0]} align="middle">
          <Col>{`${value?.find((k) => k.active)?.qty}`}</Col>
          <Col>
            <Button
              type="primary"
              size="small"
              ghost
              shape="round"
              onClick={() => {
                setViewLotsDrawer({ onChange, lots: value, formRequiredValue });
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
              <LotField
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

      {viewLotsDrawer && (
        <LotDetailsDrawer
          inventoryId={field.inventoryId}
          onChange={(data) => {
            viewLotsDrawer.onChange(data);
            setViewLotsDrawer(null);
          }}
          lots={viewLotsDrawer.lots}
          formRequiredValue={viewLotsDrawer.formRequiredValue}
          onClose={() => {
            setViewLotsDrawer(null);
          }}
        />
      )}
    </>
  );
};

export default LotDetailField;
