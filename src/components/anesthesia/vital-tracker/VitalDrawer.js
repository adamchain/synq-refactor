import React, { useState, useEffect } from "react";
import { Button, Drawer, Form } from "antd";
import "./Vital.scss";
import VitalForm from "./VitalForm";

import { utcToLocal } from "../../util/TimeUtil";

const VitalDrawer = ({ inputData, onClose, onAdd, onEdit }) => {
  const [form] = Form.useForm();
  const [buttonType, setButtonType] = useState("close");

  useEffect(() => {
    if (inputData.data) {
      form.setFieldsValue({
        ...inputData.data,
        stTime: utcToLocal(inputData.data.stTime, "HH:mm A"),
      });
    }
  }, [inputData]);

  return (
    <Drawer
      className="vital-drawer"
      title={(inputData.isEdit ? "Edit " : "Add ") + "Vital Tracking"}
      width={492}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          <Button
            onClick={onClose}
            shape="round"
            size="large"
            style={{ marginRight: 16 }}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="default"
            onClick={() => {
              setButtonType("close");
            }}
            style={{ marginRight: 16 }}
            form="vital-form-id"
            size="large"
            shape="round"
          >
            {"Save & Close"}
          </Button>
          {!inputData.isEdit && (
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => {
                setButtonType("next");
              }}
              form="vital-form-id"
              size="large"
              shape="round"
            >
              {"Save & Next"}
            </Button>
          )}
        </div>
      }
    >
      <VitalForm
        vitalForm={form}
        onAdd={(values) => {
          onAdd(values);
          if (buttonType === "close") {
            onClose();
          } else {
            form.resetFields();
            form.setFieldsValue({ status: values.status });
          }
        }}
        onEdit={(values) => {
          onEdit({ ...values, id: inputData.data.id });
          onClose();
        }}
        isEdit={inputData.isEdit}
      />
    </Drawer>
  );
};
export default VitalDrawer;
