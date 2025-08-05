import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Drawer, Form } from "antd";
import PrintLabelForm from "./PrintLabelForm";
import "./Labels.scss";
import { localToUtc, momentLocal } from "../util/TimeUtil";
import MedicationServices from "../../services/MedicationServices";
import CommonUtil from "../util/CommonUtil";
import StaffServices from "../../services/StaffServices";
import { CommonContext } from "../../context/CommonContext";
import LabelUtil from "./LabelUtil";

const PrintLabelDrawer = (props) => {
  const commonContext = useContext(CommonContext);
  const [formInputData, setFormInputData] = useState({
    expirationType: "text",
    refillExpirationDate: null,
    vets: [],
  });
  const [form] = Form.useForm();

  const getValidDate = (expiryId, expiryDays) => {
    let expiryDetail = CommonUtil.EXPIRATION_FIELD[expiryId];
    if (expiryId === 8 && expiryDays > 0) {
      expiryDetail = { count: expiryDays, type: "days" };
    }
    let expiryDate = expiryDetail
      ? momentLocal().add(expiryDetail.count, expiryDetail.type)
      : null;
    // return  expiryDetail?  (expiryId ===8 ? expiryDate: expiryDate.format("MM/DD/YYYY")):null;
    return expiryDate ? expiryDate : null;
  };
  useEffect(() => {
    StaffServices.fetchStaff((data) => {
      let vets = data.map((v) => ({
        ...v,
        value: Number.parseInt(v.userId),
        name: v.firstName + " " + v.lastName,
      }));
      setFormInputData((k) => ({ ...k, vets }));
      if (props.itemData) {
        let stDate = props.itemData.stDate
          ? momentLocal(props.itemData.stDate, "YYYY-MM-DD")
          : momentLocal();
        let refillExpirationDate = null;
        if (props.itemData.inventoryExpirationId) {
          refillExpirationDate = getValidDate(
            props.itemData.inventoryExpirationId,
            props.itemData.inventoryExpirationDays,
          );
        }

        setFormInputData((k) => ({
          ...k,
          expirationType:
            props.itemData.inventoryExpirationId === 8 ? "date" : "text",
          refillExpirationDate,
        }));
        form.setFieldsValue({
          ...props.itemData,
          stDate,
          refillExpirationDate,
        });
      } else {
        form.setFieldsValue({
          refillExpirationDate: null,
          stDate: momentLocal(),
        });
      }
    });
  }, []);

  const onClose = () => props.onClose();
  const handleSubmit = (submitData, vets) => {
    // let refillExpirationDate = formInputData.expirationType==="text"?null:localToUtc(submitData.refillExpirationDate).format("YYYY-MM-DD");

    let inputData = { ...submitData };
    inputData.clientId = props.itemData.clientId;
    inputData.patientId = props.itemData.patientId;
    // if(props.itemData.apptId){
    //     inputData.apptId = props.itemData.apptId;

    // }else {
    //     inputData.billingId = props.billingId;

    // }
    inputData.apptId = props.itemData.apptId;
    inputData.billingId = props.billingId;
    inputData.billingItemId = props.itemData.id;
    inputData.inventoryId = props.itemData.inventoryId;
    inputData.stDate = inputData.stDate.format("YYYY-MM-DD");
    inputData.patientMedId = props.itemData.patientMedId ?? null;
    inputData.qty = props.itemData.qty;
    inputData.inventoryExpirationDays =
      inputData.inventoryExpirationId === 8 && inputData.refillExpirationDate
        ? inputData.refillExpirationDate.diff(momentLocal(), "days") + 1
        : 0;
    delete inputData["refillExpirationDate"];

    if (props.itemData.medId) {
      let providerName =
        "Dr." + vets.find((k) => k.value === props.itemData.providerId)?.name;
      LabelUtil.printLabel(
        inputData,
        props.itemData.patientName,
        providerName,
        commonContext,
      );
    } else {
      MedicationServices.saveMedicationLabel(inputData, (medId) => {
        MedicationServices.getMedicationLabelDetails(
          medId ? medId : props.itemData.patientMedId,
          (data) => {
            let providerName =
              "Dr." + vets.find((k) => k.value === data.providerId)?.name;
            LabelUtil.printLabel(
              { ...data, ...inputData },
              props.itemData.patientName,
              providerName,
              commonContext,
            );
          },
        );
      });
    }
    onClose();
  };

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    switch (key) {
      case "inventoryExpirationId":
        let refillExpirationDate = getValidDate(formValue[key], null);
        // form.setFieldsValue({expirationDate:(formValue[key] !== "OD" ?moment().add(formValue[key],"days").format("MM/DD/YYYY"):null)});
        form.setFieldsValue({ refillExpirationDate });
        setFormInputData((k) => ({
          ...k,
          expirationType: formValue[key] === 8 ? "date" : "text",
          refillExpirationDate,
        }));
        break;
    }
  };
  return (
    <Drawer
      className="print-label-drawer"
      title="Print Label"
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
            form="print-label-form-id"
            type="primary"
            size="large"
            shape="round"
          >
            {"Print Label"}
          </Button>
        </div>
      }
    >
      <PrintLabelForm
        labelForm={form}
        patientName={props.patientName}
        handleSubmit={(values) => handleSubmit(values, formInputData.vets)}
        onFormValueChange={onFormValueChange}
        formInputData={{
          ...formInputData,
          disableRefill: !!props.itemData.medId,
        }}
      />
    </Drawer>
  );
};
export default PrintLabelDrawer;
